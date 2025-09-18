import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PersonResponseDto } from './dto/person-response.dto';
import { ErrorResponseDto } from 'src/exceptions/error-response.dto';

@ApiTags('Pessoas')
@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar uma nova pessoa',
    description: 'Cria uma nova pessoa com nome, função e área especificados.',
  })
  @ApiBody({
    type: CreatePersonDto,
    description: 'Dados para criação da pessoa',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'pessoa criada com sucesso',
    type: PersonResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'pessoa com este nome já existe',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno no servidor',
  })
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as pessoas',
    description: 'Retorna uma lista com todas as pessoas cadastradas.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de áreas retornada com sucesso',
    type: [PersonResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno no servidor',
  })
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar pessoa por ID',
    description:
      'Retorna os dados de uma pessoa específica pelo seu identificador único.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da pessoa',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pessoa encontrada com sucesso',
    type: PersonResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID fornecido não é um UUID válido',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pessoa não encontrada',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno no servidor',
  })
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }
}
