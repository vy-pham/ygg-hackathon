import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelModule } from '@vypham0209/nestjs-common';
import { PartnerController } from './partner.controller';
import { PartnerSchema } from './partner.schema';
import { PartnerService } from './partner.service';

@Module({
  imports: [ModelModule.register([PartnerSchema])],
  controllers: [PartnerController],
  providers: [PartnerService, JwtService],
  exports: [PartnerService],
})
export class PartnerModule {}
