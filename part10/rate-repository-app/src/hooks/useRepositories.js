import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {

  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  })

  const repositories = data && data.repositories ? data.repositories : null;

  return { repositories, loading, error, refetch };
};

export default useRepositories;