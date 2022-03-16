import { gql } from '@apollo/client';

export const PAGE_INFO_DATA = gql`
  fragment pageInfoData on PageInfo {
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
  }
`;
