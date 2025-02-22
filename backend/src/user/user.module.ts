import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelModule } from '@vypham0209/nestjs-common';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';

@Module({
  imports: [ModelModule.register([UserSchema])],
  providers: [JwtService],
  controllers: [UserController],
})
export class UserModule {}
