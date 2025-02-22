import { Body, Controller, Get, Headers, Inject, Post } from '@nestjs/common';
import { Public } from '@vypham0209/nestjs-common';
import { hashSync } from 'bcryptjs';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { LoginPartnerDto } from './dto/login-partner.dto';
import { PartnerService } from './partner.service';

@Controller('partner')
export class PartnerController {
  @Inject() partnerService: PartnerService;

  @Get()
  async get() {
    const { data, total } = await this.partnerService.partnerMethod.find({
      sort: { _id: -1 },
    });

    return {
      data,
      total,
    };
  }

  @Post('')
  async create(@Body() body: CreatePartnerDto) {
    await this.partnerService.partnerMethod.exists(
      { domain: body.domain },
      { throwCase: 'IF_EXISTS', message: `${body.domain} already exists` },
    );

    const password = hashSync(body.password, 5);
    const data = await this.partnerService.partnerMethod.create({
      name: body.name,
      domain: body.domain,
      username: body.username,
      password,
    });

    return {
      data,
      message: 'Create partner successfully',
    };
  }

  @Post('login')
  @Public()
  async login(
    @Body() body: LoginPartnerDto,
    @Headers('referer') referer: string,
  ) {
    const data = await this.partnerService.loginPartner(referer, body);
    return {
      data,
      message: 'Login successfully',
    };
  }
}
