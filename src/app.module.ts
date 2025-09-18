import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { AreaModule } from './area/area.module';
import { PresenceModule } from './presence/presence.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PersonModule, AreaModule, PresenceModule, PrismaModule],
})
export class AppModule {}
