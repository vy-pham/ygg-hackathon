import * as Types from './types';

export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginQuestManagerInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginQuestManager: { __typename?: 'ErrorOutput', message: string, statusCode: Types.HttpCode } | { __typename?: 'LoginQuestManagerMutation_Mutation', message: string, statusCode: Types.HttpCode, data: { __typename?: 'LoginQuestManagerMutation', token: string, role: string } } };

export type QuestManagerQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  filter?: Types.InputMaybe<Types.FilterQuestManagerInput>;
}>;


export type QuestManagerQuery = { __typename?: 'Query', questManagers: { __typename?: 'ErrorOutput', message: string, statusCode: Types.HttpCode } | { __typename?: 'QuestManagerSchema_List', message: string, statusCode: Types.HttpCode, data: Array<{ __typename?: 'QuestManagerSchema', username: string }> } };
