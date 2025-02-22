import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Inject,
    Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectMethod, Method, Public, TOKEN } from '@vypham0209/nestjs-common';
import { compareSync, hashSync } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserSchema } from './user.schema';
@Controller('user')
export class UserController {
  @InjectMethod(UserSchema.collectionName) userMethod: Method<UserSchema>;
  @Inject() jwtService: JwtService;
  @Inject(TOKEN.USER) user: JWTPayload;
  @Get('/me')
  async get() {
    const data = await this.userMethod.findOne(
      { _id: this.user._id },
      { select: { password: 0 }, isThrow: true, message: 'User not exists' },
    );
    return {
      data,
      message: 'Get my user successfully',
    };
  }

  @Public()
  @Post()
  async createUser(@Body() { username, password }: CreateUserDto) {
    await this.userMethod.exists(
      { username },
      { throwCase: 'IF_EXISTS', message: `${username} already exists` },
    );
    const hashPassword = hashSync(password, 10);
    const user = await this.userMethod.create({
      username,
      password: hashPassword,
    });
    return {
      data: { username: user.username },
      message: 'Create user successfully',
    };
  }

  @Public()
  @Post('/login')
  async login(@Body() { username, password }: LoginDto) {
    const user = await this.userMethod.findOne(
      { username },
      { isThrow: true, message: `${username} is not exists` },
    );
    const isCorrectPassword = compareSync(password, user.password);
    if (!isCorrectPassword) {
      throw new BadRequestException('Password is incorrect');
    }

    const jwt = this.jwtService.sign(
      { _id: user._id, username: user.username },
      {
        secret: Config.JWT_SECRET,
      },
    );

    return {
      data: {
        token: jwt,
      },
      message: 'Login successfully',
    };
  }
}
