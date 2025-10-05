import { Request, Response } from 'express';
import prisma from '../db';
import { authMiddleware } from '../middlewares/authMiddleware';

export const getHosts = async (req: Request, res: Response) => {
  try {
    const hosts = await prisma.host.findMany({
      include: {
        bookings: true,
      },
    });
    res.json(hosts);
  } catch (error) {
    console.error('Error fetching hosts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getHostById = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;
    const host = await prisma.host.findUnique({
      where: { hostId },
      include: {
        bookings: true,
      },
    });

    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }

    res.json(host);
  } catch (error) {
    console.error('Error fetching host:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createHost = async (req: Request, res: Response) => {
  try {
    const { name, type, location, amenities } = req.body;

    const host = await prisma.host.create({
      data: {
        name,
        type,
        location,
        amenities,
      },
    });

    res.status(201).json(host);
  } catch (error) {
    console.error('Error creating host:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateHost = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;
    const { name, type, location, amenities } = req.body;

    const host = await prisma.host.update({
      where: { hostId },
      data: {
        name,
        type,
        location,
        amenities,
      },
    });

    res.json(host);
  } catch (error) {
    console.error('Error updating host:', error);
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Host not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteHost = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;

    await prisma.host.delete({
      where: { hostId },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting host:', error);
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Host not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchHosts = async (req: Request, res: Response) => {
  try {
    const { location, type, amenities } = req.query;

    const where: any = {};

    if (location) {
      // Simple location search - in a real app, you'd use geospatial queries
      where.location = {
        path: ['city'],
        string_contains: location as string,
      };
    }

    if (type) {
      where.type = type as string;
    }

    if (amenities) {
      // Search for hosts that have specific amenities
      const amenityList = (amenities as string).split(',');
      where.amenities = {
        path: ['$'],
        array_contains: amenityList,
      };
    }

    const hosts = await prisma.host.findMany({
      where,
      include: {
        bookings: true,
      },
    });

    res.json(hosts);
  } catch (error) {
    console.error('Error searching hosts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
