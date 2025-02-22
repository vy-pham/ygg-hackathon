import { BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectMethod, Method } from '@vypham0209/nestjs-common';
import { compareSync } from 'bcryptjs';
import { LoginPartnerDto } from './dto/login-partner.dto';
import { PartnerSchema } from './partner.schema';

export class PartnerService {
  @InjectMethod(PartnerSchema.collectionName)
  partnerMethod: Method<PartnerSchema>;

  @Inject() jwtService: JwtService;

  async loginPartner(referer: string, { username, password }: LoginPartnerDto) {
    const userPartner = await this.partnerMethod.findOne(
      { domain: referer, username },
      {
        isThrow: true,
        message: `Username ${username} with domain ${referer} not found`,
      },
    );

    const isMatchPassword = compareSync(password, userPartner.password);
    if (!isMatchPassword) {
      throw new BadRequestException('Incorrect password');
    }

    const token = this.jwtService.sign(
      {
        _id: userPartner._id,
        tenant: userPartner.domain,
      },
      { expiresIn: 3600, secret: Config.JWT_SECRET },
    );

    return {
      token,
      role: 'Admin',
    };
  }
}
