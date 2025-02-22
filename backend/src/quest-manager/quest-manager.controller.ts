import { Body, Controller, Headers, Inject, Post } from '@nestjs/common';
import { Public } from '@vypham0209/nestjs-common';
import { CreateQuestManagerDto } from './dto/create-quest-manager.dto';
import { LoginQuestManagerDto } from './dto/login-quest-manager.dto';
import { QuestManagerService } from './quest-manager.service';

@Controller('quest-manager')
export class QuestManagerController {
  @Inject() questManagerService: QuestManagerService;
  @Post()
  async createQuestManager(@Body() body: CreateQuestManagerDto) {
    const data = await this.questManagerService.createQuestManager(body);
    return {
      data,
      message: 'Create quest manager successfully',
    };
  }

  @Post('login')
  @Public()
  async loginQuestManager(
    @Body() body: LoginQuestManagerDto,
    @Headers('referer') referer: string,
  ) {
    const data = await this.questManagerService.loginQuestManager(
      referer,
      body,
    );
    return {
      data,
      message: 'Login QM successfully',
    };
  }
}
