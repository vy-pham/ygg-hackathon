import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { AbstractSchema, NestSchema } from '@vypham0209/nestjs-common';
import { COLLECTION } from 'enum/collection.enum';

@ObjectType()
@NestSchema({ softDelete: true })
export class QuestManagerSchema extends AbstractSchema {
  static collectionName = COLLECTION.quest_managers;
  @Prop({ type: String })
  @Field(() => String)
  username: string;

  @Prop({ type: String })
  password: string;
}

@ObjectType()
export class CreateQuestManagerMutation extends PickType(QuestManagerSchema, [
  'username',
]) {}

@ObjectType()
export class LoginQuestManagerMutation {
  @Field(() => String)
  token: string;
  @Field(() => String)
  role: string;
}
