import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { PresenceQueryDto } from './dto/presence-query.dto';
import { Presence } from '@prisma/client';
import { AggregatePeriodQueryDto } from './dto/aggregate-period-query.dto';

@Injectable()
export class PresenceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPresenceDto: CreatePresenceDto): Promise<Presence> {
    return await this.prisma.presence.create({
      data: {
        personId: createPresenceDto.personId,
        areaId: createPresenceDto.areaId,
        occurredAt: createPresenceDto.occurredAt || new Date(),
      },
    });
  }

  async findMany(filters: PresenceQueryDto): Promise<Presence[]> {
    const { personId, areaId, startDate, endDate } = filters;

    const where: any = {};

    if (personId) {
      where.personId = personId;
    }

    if (areaId) {
      where.areaId = areaId;
    }

    if (startDate || endDate) {
      where.occurredAt = {};
      if (startDate) {
        where.occurredAt.gte = new Date(startDate);
      }
      if (endDate) {
        const endDateTime = new Date(endDate);
        endDateTime.setHours(23, 59, 59, 999);
        where.occurredAt.lte = endDateTime;
      }
    }

    const presences = await this.prisma.presence.findMany({
      where,
      include: {
        person: true,
        area: true,
      },
      orderBy: {
        occurredAt: 'desc',
      },
    });

    return presences;
  }

  async countByArea(areaId: string) {
    const count = await this.prisma.presence.count({
      where: { areaId },
    });

    return { count };
  }

  async countByPeriod(filters: AggregatePeriodQueryDto) {
    const where: any = {};

    if (filters.startDate || filters.endDate) {
      where.occurredAt = {};
      if (filters.startDate) {
        const startDateTime = new Date(filters.startDate);
        startDateTime.setHours(0, 0, 0, 0);
        where.occurredAt.gte = startDateTime;
      }
      if (filters.endDate) {
        const endDateTime = new Date(filters.endDate);
        endDateTime.setHours(23, 59, 59, 999);
        where.occurredAt.lte = endDateTime;
      }
    }

    const count = await this.prisma.presence.count({ where });

    return { count };
  }
}
