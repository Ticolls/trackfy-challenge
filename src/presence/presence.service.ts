import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { PresenceRepository } from './presence.repository';
import { PresenceResponseDto } from './dto/presence-response.dto';
import { handlePrismaError } from 'src/exceptions/handlePrismaError';
import { PresenceQueryDto } from './dto/presence-query.dto';
import { PersonRepository } from 'src/person/person.repository';
import { AreaRepository } from 'src/area/area.repository';
import { AggregatePeriodQueryDto } from './dto/aggregate-period-query.dto';

@Injectable()
export class PresenceService {
  constructor(
    readonly presenceRepository: PresenceRepository,
    readonly personRepository: PersonRepository,
    readonly areaRepository: AreaRepository,
  ) {}
  async create(createPresenceDto: CreatePresenceDto) {
    try {
      const areaExists = await this.areaRepository.exists(
        createPresenceDto.areaId,
      );

      if (!areaExists) {
        throw new BadRequestException('Não existe uma área com esse ID');
      }

      const personExists = await this.personRepository.exists(
        createPresenceDto.personId,
      );

      if (!personExists) {
        throw new BadRequestException('Não existe uma pessoa com esse ID');
      }

      const now = new Date();
      const occurredAt = createPresenceDto.occurredAt
        ? new Date(createPresenceDto.occurredAt)
        : null;

      if (occurredAt && occurredAt > now) {
        throw new BadRequestException(
          'Não é possível cadastrar uma presença no futuro',
        );
      }

      const createdPresence =
        await this.presenceRepository.create(createPresenceDto);

      return new PresenceResponseDto(createdPresence);
    } catch (error) {
      handlePrismaError(error, 'Presença');
    }
  }

  async findAll(filters: PresenceQueryDto) {
    try {
      const presences = await this.presenceRepository.findMany(filters);

      return presences.map((presence) => new PresenceResponseDto(presence));
    } catch (error) {
      handlePrismaError(error, 'Presença');
    }
  }

  async aggregateByArea(areaId: string) {
    try {
      const areaExists = await this.areaRepository.exists(areaId);

      if (!areaExists) {
        throw new BadRequestException('Não existe uma área com esse ID');
      }
      const agreggate = await this.presenceRepository.countByArea(areaId);

      return agreggate;
    } catch (error) {
      handlePrismaError(error, 'Presença', areaId);
    }
  }

  async aggregateByPeriod(filters: AggregatePeriodQueryDto) {
    try {
      const agreggate = await this.presenceRepository.countByPeriod(filters);

      return agreggate;
    } catch (error) {
      handlePrismaError(error, 'Presença');
    }
  }
}
