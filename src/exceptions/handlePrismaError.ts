import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
  HttpException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function handlePrismaError(
  error: any,
  entityName?: string,
  id?: string,
): never {
  if (error instanceof HttpException) {
    throw error;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const entity = entityName || 'Registro';

    switch (error.code) {
      case 'P2002': {
        const field = Array.isArray(error.meta?.target)
          ? error.meta.target[0]
          : error.meta?.target || 'campo';
        throw new ConflictException(
          `Já existe um ${entity.toLowerCase()} com esse ${field}`,
        );
      }

      case 'P2025':
        throw new NotFoundException(
          `${entity} ${id ? `'${id}'` : ''} não encontrado`,
        );

      default:
        throw new BadRequestException(
          `Erro de banco de dados: ${error.message}`,
        );
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new BadRequestException('Dados inválidos fornecidos para a operação');
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new InternalServerErrorException(
      'Erro de conexão com o banco de dados',
    );
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    throw new InternalServerErrorException('Erro interno do banco de dados');
  }

  throw new InternalServerErrorException(
    `Erro interno do servidor: ${error.message || 'Erro desconhecido'}`,
  );
}
