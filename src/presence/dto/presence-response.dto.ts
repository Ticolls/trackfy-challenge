import { ApiProperty } from '@nestjs/swagger';
import { Presence, Person, Area } from '@prisma/client';
import { AreaResponseDto } from 'src/area/dto/area-response.dto';
import { PersonResponseDto } from 'src/person/dto/person-response.dto';

export class PresenceResponseDto {
  @ApiProperty({
    description: 'Identificador único da presença',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'ID da pessoa que estava presente',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  personId: string;

  @ApiProperty({
    description: 'ID da área onde a presença foi registrada',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  areaId: string;

  @ApiProperty({
    description: 'Data e hora em que a presença ocorreu',
    example: '2024-09-17T14:30:00Z',
    format: 'date-time',
  })
  occurredAt: Date;

  @ApiProperty({
    description: 'Informações da pessoa presente',
    type: () => PersonResponseDto,
    required: false,
  })
  person?: PersonResponseDto;

  @ApiProperty({
    description: 'Informações da área onde a presença foi registrada',
    type: () => AreaResponseDto,
    required: false,
  })
  area?: AreaResponseDto;

  @ApiProperty({
    description: 'Data e hora de criação do registro',
    example: '2024-09-17T10:30:00Z',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data e hora da última atualização do registro',
    example: '2024-09-17T14:45:00Z',
    format: 'date-time',
  })
  updatedAt: Date;

  constructor(presence: Presence & { person?: Person; area?: Area }) {
    this.id = presence.id;
    this.areaId = presence.areaId;
    this.personId = presence.personId;
    this.occurredAt = presence.occurredAt;
    this.createdAt = presence.createdAt;
    this.updatedAt = presence.updatedAt;

    if (presence.person) {
      this.person = new PersonResponseDto(presence.person);
    }

    if (presence.area) {
      this.area = new AreaResponseDto(presence.area);
    }
  }
}
