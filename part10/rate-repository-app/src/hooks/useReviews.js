import { useQuery } from '@apollo/client';

import { AUTHENTICATED_USER } from '../graphql/queries';

const useReviews = (variables) => {
  const { data, loading, fetchMore, refetch, ...result } = useQuery(AUTHENTICATED_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    reviews: data?.me.reviews,
    fetchMore: handleFetchMore,
    refetch,
    loading,
    ...result,
  };
};

export default useReviews;