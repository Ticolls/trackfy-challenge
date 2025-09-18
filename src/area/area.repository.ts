import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { Area } from '@prisma/client';

@Injectable()
export class AreaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    return await this.prisma.area.create({
      data: {
        name: createAreaDto.name,
        type: createAreaDto.type,
        location: createAreaDto.location,
      },
    });
  }

  async findAll(): Promise<Area[]> {
    return await this.prisma.area.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Area | null> {
    return await this.prisma.area.findUnique({
      where: { id },
      include: {
        persons: true,
      },
    });
  }

  async findByName(name: string): Promise<Area | null> {
    return await this.prisma.area.findUnique({
      where: { name },
    });
  }

  async exists(id: string): Promise<boolean> {
    const area = await this.prisma.area.findUnique({
      where: { id },
    });

    return !!area;
  }
}
