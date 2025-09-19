import { ApiProperty } from '@nestjs/swagger';

export class CountResponseDto {
  @ApiProperty({ example: 42, description: 'Número total encontrado' })
  count: number;
}
