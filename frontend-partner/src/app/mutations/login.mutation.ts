import { gql } from 'apollo-angular';

export const LOGIN = gql`
  mutation Login($input: LoginQuestManagerInput!) {
    loginQuestManager(input: $input) {
      ... on BaseResponse {
        message
        statusCode
      }
      ... on LoginQuestManagerMutation_Mutation {
        data {
          token
          role
        }
      }
    }
  }
`;
