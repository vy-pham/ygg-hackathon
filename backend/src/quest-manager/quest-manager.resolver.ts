import { Inject } from '@nestjs/common';
import { Context, Resolver } from '@nestjs/graphql';
import { Public } from '@vypham0209/nestjs-common';
import { Filters } from 'src/decorators/filter.decorator';
import { Input } from 'src/decorators/input.decorator';
import { Mutation } from 'src/decorators/mutation.decorator';
import { Pagination } from 'src/decorators/pagination.decorator';
import { QueryList } from 'src/decorators/query-list.decorator';
import { CreateQuestManagerInput } from './input/create-quest-manager.input';
import { FilterQuestManagerInput } from './input/filter-quest-manager.input';
import { LoginQuestManagerInput } from './input/login-quest-manager.input';
import {
  CreateQuestManagerMutation,
  LoginQuestManagerMutation,
  QuestManagerSchema,
} from './quest-manager.schema';
import { QuestManagerService } from './quest-manager.service';
@Resolver()
export class QuestManagerResolver {
  @Inject() questManagerService: QuestManagerService;
  @Mutation(CreateQuestManagerMutation)
  async createQuestManager(
    @Input() input: CreateQuestManagerInput,
  ): ResolverReturnedType<CreateQuestManagerMutation> {
    console.log(234);

    const data = await this.questManagerService.createQuestManager(input);
    return {
      data,
      message: 'Create quest manager successfully',
    };
  }

  @Mutation(LoginQuestManagerMutation)
  @Public()
  async loginQuestManager(
    @Context() context: { req: Request },
    @Input() input: LoginQuestManagerInput,
  ) {
    const headers = context.req.headers as any;
    const domain = new URL(headers.referer);
    const data = await this.questManagerService.loginQuestManager(
      domain.host,
      input,
    );
    console.log(data);

    return {
      data,
      message: 'Login successfully',
    };
  }

  @QueryList(QuestManagerSchema)
  async questManagers(
    @Pagination() pagination: Pagination,
    @Filters() filters: FilterQuestManagerInput,
  ) {
    const { data, total } = await this.questManagerService.getQuestManagers(
      filters,
      pagination,
    );
    return {
      data,
      total,
      message: 'Get quest manager successfully',
    };
  }
}
