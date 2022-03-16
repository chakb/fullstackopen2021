import { gql } from '@apollo/client';
import { PAGE_INFO_DATA } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ownerAvatarUrl
          fullName
          description
          language
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          id
        }
        cursor
      }
      pageInfo {
        ...pageInfoData
      }
      totalCount
    }
  }
  ${PAGE_INFO_DATA}
`;

export const GET_REPOSITORY_BY_ID = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      fullName
      url
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      ownerAvatarUrl
      description
      language
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          ...pageInfoData
        }
      }
    }
  }
  ${PAGE_INFO_DATA}
`;

export const AUTHENTICATED_USER = gql`
  query authenticatedUser($includeReviews: Boolean = false, $first: Int, $after: String) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        totalCount
        pageInfo {
          ...pageInfoData
        }
        edges {
          cursor
          node {
            id
            rating
            text
            createdAt
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
  ${PAGE_INFO_DATA}
`;
