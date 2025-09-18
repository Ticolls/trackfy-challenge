import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { AreaRepository } from './area.repository';
import { AreaResponseDto } from './dto/area-response.dto';
import { handlePrismaError } from 'src/exceptions/handlePrismaError';

@Injectable()
export class AreaService {
  constructor(readonly areaRepository: AreaRepository) {}
  async create(createAreaDto: CreateAreaDto): Promise<AreaResponseDto> {
    try {
      const exists = await this.areaRepository.findByName(createAreaDto.name);

      if (exists) {
        throw new ConflictException('Área com esse nome já existe');
      }

      const createdArea = await this.areaRepository.create(createAreaDto);
      return new AreaResponseDto(createdArea);
    } catch (error) {
      handlePrismaError(error, 'Área');
    }
  }

  async findAll(): Promise<AreaResponseDto[]> {
    try {
      const areas = await this.areaRepository.findAll();
      return areas.map((area) => new AreaResponseDto(area));
    } catch (error) {
      handlePrismaError(error, 'Área');
    }
  }

  async findOne(id: string): Promise<AreaResponseDto> {
    try {
      const area = await this.areaRepository.findById(id);
      if (!area) {
        throw new BadRequestException(`Àrea com id: ${id} não encontrada`);
      }

      return new AreaResponseDto(area);
    } catch (error) {
      handlePrismaError(error, 'Área');
    }
  }
}
