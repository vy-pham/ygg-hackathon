import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterQuestManagerInput {
  @Field()
  name: string;
}
