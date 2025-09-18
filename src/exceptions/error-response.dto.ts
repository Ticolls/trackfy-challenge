import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Código de status HTTP',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem de erro',
    oneOf: [
      { type: 'string', example: 'Area com id: 123 não encontrada' },
      {
        type: 'array',
        items: { type: 'string' },
        example: ['O nome é obrigatório'],
      },
    ],
  })
  message: string | string[];
}
