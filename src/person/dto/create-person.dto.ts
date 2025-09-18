import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({
    description: 'Nome completo da pessoa',
    example: 'João Silva Santos',
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Função/cargo da pessoa na empresa',
    example: 'Operador de Máquina',
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: 'A função deve ser uma string' })
  @IsNotEmpty({ message: 'A função é obrigatória' })
  @MinLength(2, { message: 'A função deve ter pelo menos 2 caracteres' })
  @MaxLength(50, { message: 'A função deve ter no máximo 50 caracteres' })
  role: string;

  @ApiProperty({
    description: 'ID da área onde a pessoa trabalha',
    format: 'uuid',
  })
  @IsUUID(4, { message: 'O ID da área deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O ID da área é obrigatório' })
  areaId: string;
}
