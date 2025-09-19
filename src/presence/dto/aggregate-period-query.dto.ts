import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class AggregatePeriodQueryDto {
  @ApiProperty({
    description:
      'Data de início do período no formato YYYY-MM-DD ou YYYY-MM-DDTHH:MM:SS',
    example: '2024-09-01',
    format: 'date',
    required: false,
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'A data de início deve estar no formato válido (YYYY-MM-DD ou ISO 8601)',
    },
  )
  startDate?: string;

  @ApiProperty({
    description:
      'Data de fim do período no formato YYYY-MM-DD ou YYYY-MM-DDTHH:MM:SS',
    example: '2024-09-30',
    format: 'date',
    required: false,
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'A data de fim deve estar no formato válido (YYYY-MM-DD ou ISO 8601)',
    },
  )
  endDate?: string;
}
