import { gql } from 'apollo-angular';

export const QUEST_MANAGER_QUERY = gql`
  query QuestManager(
    $pagination: PaginationInput
    $filter: FilterQuestManagerInput
  ) {
    questManagers(pagination: $pagination, filter: $filter) {
      ... on BaseResponse {
        message
        statusCode
      }
      ... on QuestManagerSchema_List {
        data {
          username
        }
      }
    }
  }
`;
