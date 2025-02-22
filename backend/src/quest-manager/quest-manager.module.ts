import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ModelModule } from '@vypham0209/nestjs-common'
import { PartnerSchema } from 'src/partner/partner.schema'
import { QuestManagerController } from './quest-manager.controller'
import { QuestManagerResolver } from './quest-manager.resolver'
import { QuestManagerSchema } from './quest-manager.schema'
import { QuestManagerService } from './quest-manager.service'

@Module({
  imports: [
    ModelModule.register([PartnerSchema, QuestManagerSchema]),
    ModelModule.registerWithoutRequest([QuestManagerSchema]),
  ],
  controllers: [QuestManagerController],
  providers: [QuestManagerService, QuestManagerResolver, JwtService],
  exports: [QuestManagerService],
})
export class QuestManagerModule {}
