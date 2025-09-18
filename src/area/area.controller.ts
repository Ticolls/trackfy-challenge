import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { AreaResponseDto } from './dto/area-response.dto';
import { ErrorResponseDto } from 'src/exceptions/error-response.dto';

@ApiTags('Áreas')
@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar uma nova área',
    description:
      'Cria uma nova área com nome, tipo e localização especificados.',
  })
  @ApiBody({
    type: CreateAreaDto,
    description: 'Dados para criação da área',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Área criada com sucesso',
    type: [AreaResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Área com este nome já existe',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno no servidor',
  })
  async create(
    @Body(ValidationPipe) createAreaDto: CreateAreaDto,
  ): Promise<AreaResponseDto> {
    return await this.areaService.create(createAreaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as áreas',
    description: 'Retorna uma lista com todas as áreas cadastradas.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de áreas retornada com sucesso',
    type: [AreaResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno no servidor',
  })
  async findAll(): Promise<AreaResponseDto[]> {
    return await this.areaService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar área por ID',
    description:
      'Retorna os dados de uma área específica pelo seu identificador único.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da área',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Área encontrada com sucesso',
    type: AreaResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID fornecido não é um UUID válido',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Área não encontrada',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno no servidor',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AreaResponseDto> {
    return await this.areaService.findOne(id);
  }
}
