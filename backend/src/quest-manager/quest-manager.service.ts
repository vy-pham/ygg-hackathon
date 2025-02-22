import { BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  InjectMethod,
  InjectMethodFactory,
  Method,
  MethodFactory,
  TOKEN,
} from '@vypham0209/nestjs-common';
import { compareSync, hashSync } from 'bcryptjs';
import { FilterQuery } from 'mongoose';
import { PartnerSchema } from 'src/partner/partner.schema';
import { CreateQuestManagerDto } from './dto/create-quest-manager.dto';
import { LoginQuestManagerDto } from './dto/login-quest-manager.dto';
import { FilterQuestManagerInput } from './input/filter-quest-manager.input';
import { QuestManagerSchema } from './quest-manager.schema';

export class QuestManagerService {
  @Inject(TOKEN.USER) user: JWTPayload;
  @InjectMethod(PartnerSchema.collectionName)
  partnerMethod: Method<PartnerSchema>;

  @InjectMethod(QuestManagerSchema.collectionName)
  questManagerMethod: Method<QuestManagerSchema>;

  @InjectMethodFactory(QuestManagerSchema.collectionName)
  questManagerMethodFactory: MethodFactory<QuestManagerSchema>;

  @Inject() jwtService: JwtService;
  async createQuestManager({ username, password }: CreateQuestManagerDto) {
    console.log(this.user._id);

    await this.partnerMethod.exists(
      { _id: this.user._id },
      { throwCase: 'IF_NOT_EXISTS', message: 'Invalid partner token' },
    );

    await this.questManagerMethod.exists(
      { username },
      { throwCase: 'IF_EXISTS', message: `${username} existed` },
    );

    const hashPassword = hashSync(password, 5);
    const questManager = await this.questManagerMethod.create({
      username,
      password: hashPassword,
    });

    return questManager;
  }

  async loginQuestManager(
    referer: string,
    { username, password }: LoginQuestManagerDto,
  ) {
    await this.partnerMethod.exists(
      { domain: referer },
      { throwCase: 'IF_NOT_EXISTS', message: `${referer} is not exists` },
    );
    const questManagerMethod = this.questManagerMethodFactory(referer);
    const findQuestManager = await questManagerMethod.findOne({
      username,
    });
    let hashPassword = '';
    let role = 'QuestManager';
    let _id = '';
    if (findQuestManager) {
      hashPassword = findQuestManager.password;
      role = 'QuestManager';
      _id = findQuestManager._id.toString();
    } else {
      const findPartner = await this.partnerMethod.findOne(
        { username, domain: referer },
        { isThrow: true, message: `${username} is not exists` },
      );
      hashPassword = findPartner.password;
      role = 'Admin';
      _id = findPartner._id.toString();
    }

    const isMatchPassword = compareSync(password, hashPassword);
    if (!isMatchPassword) {
      throw new BadRequestException('Incorrect password');
    }

    const token = this.jwtService.sign(
      {
        _id,
        role,
        tenant: referer,
      },
      {
        expiresIn: 360000,
        secret: Config.JWT_SECRET,
      },
    );

    return {
      token,
      role,
    };
  }

  async getQuestManagers(
    { name }: FilterQuestManagerInput,
    pagination: Pagination,
  ) {
    const query: FilterQuery<QuestManagerSchema> = {};

    if (name) {
      query.username = new RegExp(name, 'i');
    }

    const results = await this.questManagerMethod.find({
      query,
      ...pagination,
    });
    return results;
  }
}
