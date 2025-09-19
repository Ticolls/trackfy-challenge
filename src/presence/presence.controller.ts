import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpStatus,
  HttpCode,
  Param,
} from '@nestjs/common';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PresenceQueryDto } from './dto/presence-query.dto';
import { PresenceResponseDto } from './dto/presence-response.dto';
import { AggregatePeriodQueryDto } from './dto/aggregate-period-query.dto';
import { ErrorResponseDto } from 'src/exceptions/error-response.dto';
import { CountResponseDto } from './dto/count-response.dto';

@ApiTags('Presenças')
@Controller('presences')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar uma nova presença',
    description: 'Cria uma nova presença com areaId, personId e ocurredAt.',
  })
  @ApiBody({
    type: CreatePresenceDto,
    description: 'Dados para criação da presença',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'pessoa criada com sucesso',
    type: PresenceResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno no servidor',
  })
  create(@Body() createPresenceDto: CreatePresenceDto) {
    return this.presenceService.create(createPresenceDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar presenças (opcional: filtre por pessoa, área ou período)',
    description: 'Retorna uma lista com todas as presenças cadastradas.',
  })
  @ApiQuery({ name: 'personId', required: false, type: String })
  @ApiQuery({ name: 'areaId', required: false, type: String })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de presenças',
    type: [PresenceResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno no servidor',
  })
  async findAll(@Query() query: PresenceQueryDto) {
    return await this.presenceService.findAll(query);
  }

  @Get('count/area/:id')
  @ApiOperation({
    summary: 'Buscar quantidade de pessoas por área',
    description:
      'Retorna a quantidade de pessoas em uma área específica pelo seu identificador único.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da área',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contagem de pessoas',
    type: CountResponseDto,
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
  async aggregateByArea(@Param('id') id: string) {
    return await this.presenceService.aggregateByArea(id);
  }

  @Get('count/period')
  @ApiOperation({
    summary: 'Buscar quantidade de pessoas por período',
    description: 'Retorna a quantidade de pessoas em um período específico.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contagem de pessoas',
    type: CountResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno no servidor',
  })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  async aggregateByPeriod(@Query() query: AggregatePeriodQueryDto) {
    return await this.presenceService.aggregateByPeriod(query);
  }
}
