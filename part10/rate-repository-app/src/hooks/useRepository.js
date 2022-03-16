import { useQuery } from '@apollo/client';

import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useRepository = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repository = data && data.repository ? data.repository : null;

  return { repository, loading, fetchMore: handleFetchMore, ...result };
};

export default useRepository;
