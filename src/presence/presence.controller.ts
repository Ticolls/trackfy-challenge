import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PresenceQueryDto } from './dto/presence-query.dto';
import { PresenceResponseDto } from './dto/presence-response.dto';

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
}
