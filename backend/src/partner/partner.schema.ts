import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { AbstractSchema, NestSchema } from '@vypham0209/nestjs-common';
import { COLLECTION } from 'enum/collection.enum';

@NestSchema({ softDelete: true })
export class PartnerSchema extends AbstractSchema {
  static master = true;
  static collectionName = COLLECTION.partners;

  @Prop()
  name: string;

  @Prop({ type: String })
  domain: string;

  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  password: string;
}

@ObjectType()
export class LoginPartnerMutation {
  @Field(() => String)
  token: string;
  @Field(() => String)
  role: string;
}
