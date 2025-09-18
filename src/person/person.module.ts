import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonRepository } from './person.repository';
import { AreaModule } from 'src/area/area.module';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonRepository],
  imports: [AreaModule],
  exports: [PersonRepository],
})
export class PersonModule {}
