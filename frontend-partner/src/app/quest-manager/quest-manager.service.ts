import { inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import {
  QuestManagerQuery,
  QuestManagerQueryVariables,
} from '../../graphql/queries';
import {
  FilterQuestManagerInput,
  PaginationInput,
  QuestManagerSchema,
} from '../../graphql/types';
import { QUEST_MANAGER_QUERY } from '../../queries/quest-managers.queries';

export class QuestManagerService {
  apollo = inject(Apollo);
  toastr = inject(ToastrService);

  public get questManagers() {
    return this.questManagers$.value;
  }

  public set questManagers(v) {
    this.questManagers$.next(v);
  }

  private questManagers$ = new BehaviorSubject<QuestManagerSchema[]>([]);

  getQuestManagers$ = (
    filter: FilterQuestManagerInput,
    pagination: PaginationInput
  ) => {
    return this.apollo
      .query<QuestManagerQuery, QuestManagerQueryVariables>({
        query: QUEST_MANAGER_QUERY,
        variables: {
          filter,
          pagination,
        },
      })
      .pipe(
        map(({ data }) => {
          if (!data) {
            this.toastr.error('Unknown error');
            return null;
          }

          const { questManagers } = data;
          if (questManagers.__typename === 'ErrorOutput') {
            this.toastr.error(questManagers.message);
            return null;
          }
          if (questManagers.__typename === 'QuestManagerSchema_List') {
            console.log(questManagers.data);

            this.questManagers = questManagers.data;
            return questManagers.data;
          }
          return null;
        })
      );
  };
}
