import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { AreaRepository } from './area.repository';

@Module({
  controllers: [AreaController],
  providers: [AreaService, AreaRepository],
  exports: [AreaRepository],
})
export class AreaModule {}
