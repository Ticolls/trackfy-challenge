import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from '@prisma/client';

@Injectable()
export class PersonRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    return await this.prisma.person.create({
      data: {
        name: createPersonDto.name,
        role: createPersonDto.role,
        areaId: createPersonDto.areaId,
      },
      include: {
        area: true,
      },
    });
  }

  async findAll(): Promise<Person[]> {
    return await this.prisma.person.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Person | null> {
    return await this.prisma.person.findUnique({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const person = await this.prisma.person.findUnique({
      where: {
        id,
      },
    });

    return !!person;
  }
}
