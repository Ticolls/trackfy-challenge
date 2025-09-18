import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty({
    description: 'Nome identificador da área',
    example: 'Linha de Produção A',
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Tipo da área industrial',
    example: 'Produção',
    enum: [
      'Produção',
      'Administrativo',
      'Manutenção',
      'Qualidade',
      'Logística',
      'Segurança',
    ],
  })
  @IsString({ message: 'O tipo deve ser uma string' })
  @IsNotEmpty({ message: 'O tipo é obrigatório' })
  @MinLength(2, { message: 'O tipo deve ter pelo menos 2 caracteres' })
  @MaxLength(30, { message: 'O tipo deve ter no máximo 30 caracteres' })
  type: string;

  @ApiProperty({
    description: 'Localização física da área',
    example: 'Galpão 1 - Setor Norte',
    minLength: 5,
    maxLength: 150,
  })
  @IsString({ message: 'A localização deve ser uma string' })
  @IsNotEmpty({ message: 'A localização é obrigatória' })
  @MinLength(5, { message: 'A localização deve ter pelo menos 5 caracteres' })
  @MaxLength(150, {
    message: 'A localização deve ter no máximo 150 caracteres',
  })
  location: string;
}
