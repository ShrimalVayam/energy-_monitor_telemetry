import { prisma } from '../../Prisma';

interface CreateDevicePayload {
  name: string;
  type: string;
  userId: number;
}

export class DeviceService {
  static async createDevice({ name, type, userId }: CreateDevicePayload) {
    const device = await prisma.device.create({
      data: { name, type, userId },
    });

    return device;
  }

  static async getDevicesForUser(userId: number) {
    return prisma.device.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        telemetry: {
          orderBy: { timestamp: 'desc' },
        },
      },
    });
  }
}
