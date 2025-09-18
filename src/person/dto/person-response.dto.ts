import { ApiProperty } from '@nestjs/swagger';
import { Person } from '@prisma/client';
import { AreaResponseDto } from 'src/area/dto/area-response.dto';

export class PersonResponseDto {
  @ApiProperty({
    description: 'Identificador único da pessoa',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Nome completo da pessoa',
    example: 'João Silva Santos',
  })
  name: string;

  @ApiProperty({
    description: 'Função/cargo da pessoa na empresa',
    example: 'Operador de Máquina',
  })
  role: string;

  @ApiProperty({
    description: 'ID da área onde a pessoa trabalha',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  areaId: string;

  @ApiProperty({
    description: 'Informações da área onde a pessoa trabalha',
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

  constructor(person: Person) {
    this.id = person.id;
    this.name = person.name;
    this.role = person.role;
    this.createdAt = person.createdAt;
    this.updatedAt = person.updatedAt;
    this.areaId = person.areaId;
  }
}
