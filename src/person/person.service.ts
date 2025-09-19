import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonRepository } from './person.repository';
import { handlePrismaError } from 'src/exceptions/handlePrismaError';
import { PersonResponseDto } from './dto/person-response.dto';
import { AreaRepository } from 'src/area/area.repository';

@Injectable()
export class PersonService {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly areaRepository: AreaRepository,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const areaExists = await this.areaRepository.exists(
        createPersonDto.areaId,
      );

      if (!areaExists) {
        throw new BadRequestException('Não existe uma área com esse ID');
      }

      const createdPerson = await this.personRepository.create(createPersonDto);
      return new PersonResponseDto(createdPerson);
    } catch (error) {
      handlePrismaError(error, 'Pessoa');
    }
  }

  async findAll() {
    try {
      const persons = await this.personRepository.findAll();
      return persons.map((person) => new PersonResponseDto(person));
    } catch (error) {
      handlePrismaError(error, 'Pessoa');
    }
  }

  async findOne(id: string) {
    try {
      const person = await this.personRepository.findById(id);
      if (!person) {
        throw new BadRequestException(`Pessoa com id: ${id} não encontrada`);
      }

      return new PersonResponseDto(person);
    } catch (error) {
      handlePrismaError(error, 'Pessoa', id);
    }
  }
}
