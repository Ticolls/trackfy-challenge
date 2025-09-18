import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePresenceDto {
  @ApiProperty({
    description: 'ID da pessoa que está presente',
    format: 'uuid',
  })
  @IsUUID(4, { message: 'O ID da pessoa deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O ID da pessoa é obrigatório' })
  personId: string;

  @ApiProperty({
    description: 'ID da área onde a presença foi registrada',
    format: 'uuid',
  })
  @IsUUID(4, { message: 'O ID da área deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O ID da área é obrigatório' })
  areaId: string;

  @ApiProperty({
    description:
      'Data e hora em que a presença ocorreu (opcional, padrão é agora)',
    example: '2024-09-17T14:30:00Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  occurredAt?: Date;
}
