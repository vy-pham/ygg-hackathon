import { Prop } from '@nestjs/mongoose';
import { AbstractSchema, NestSchema } from '@vypham0209/nestjs-common';
import { COLLECTION } from 'enum/collection.enum';

@NestSchema({ softDelete: true })
export class UserSchema extends AbstractSchema {
  static master = true;
  static collectionName = COLLECTION.users;
  @Prop({ type: String, unique: true })
  username: string;

  @Prop({ type: String })
  password: string;
}
