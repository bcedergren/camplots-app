import prisma from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const registerUser = async (userData: any): Promise<any> => {
  const { email, password, username, role } = userData;
  const passwordHash = await bcrypt.hash(password, 10);
  // Only allow USER or HOST roles via registration
  let safeRole = 'USER';
  if (role && (role === 'HOST' || role === 'USER')) {
    safeRole = role;
  }
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      username,
    },
  });
  return user;
};

export const loginUser = async (
  credentials: any
): Promise<{ token: string; expiresIn: number }> => {
  const { email, password } = credentials;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user.userId },
    process.env.JWT_SECRET || 'your_jwt_secret',
    {
      expiresIn: '1h',
    }
  );

  return { token, expiresIn: 3600 };
};

export const requestPasswordReset = async (email: string): Promise<string> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // For security, we don't reveal if the email exists
    // but we still return success
    return 'If an account exists, a reset link has been sent.';
  }

  // Generate a secure random token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

  // Hash the token before storing
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: hashedToken,
      resetTokenExpiry,
    },
  });

  // TODO: Send email with reset link
  // In production, you would send an email here with a link like:
  // `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
  console.log(`Password reset token for ${email}: ${resetToken}`);
  console.log(
    `Reset link: http://localhost:3000/reset-password?token=${resetToken}`
  );

  return 'If an account exists, a reset link has been sent.';
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<string> => {
  // Hash the token to compare with stored hash
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await prisma.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: {
        gt: new Date(), // Token hasn't expired
      },
    },
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  // Hash the new password
  const passwordHash = await bcrypt.hash(newPassword, 10);

  // Update password and clear reset token
  await prisma.user.update({
    where: { userId: user.userId },
    data: {
      passwordHash,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return 'Password has been reset successfully';
};

export const getUserProfile = async (userId: string): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      username: true,
      email: true,
      subscriptionType: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
