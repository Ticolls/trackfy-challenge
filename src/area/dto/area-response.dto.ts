import { ApiProperty } from '@nestjs/swagger';
import { Area } from '@prisma/client';

export class AreaResponseDto {
  @ApiProperty({
    description: 'Identificador único da área',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Nome identificador da área',
    example: 'Linha de Produção A',
  })
  name: string;

  @ApiProperty({
    description: 'Tipo da área industrial',
    example: 'Produção',
  })
  type: string;

  @ApiProperty({
    description: 'Localização física da área',
    example: 'Galpão 1 - Setor Norte',
  })
  location: string;

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

  constructor(area: Area) {
    this.id = area.id;
    this.name = area.name;
    this.location = area.location;
    this.type = area.type;
    this.createdAt = area.createdAt;
    this.updatedAt = area.updatedAt;
  }
}
