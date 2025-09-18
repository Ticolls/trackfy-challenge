import { Module } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { PresenceController } from './presence.controller';
import { PresenceRepository } from './presence.repository';
import { AreaModule } from 'src/area/area.module';
import { PersonModule } from 'src/person/person.module';

@Module({
  controllers: [PresenceController],
  providers: [PresenceService, PresenceRepository],
  imports: [AreaModule, PersonModule],
})
export class PresenceModule {}
