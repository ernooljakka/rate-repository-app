import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  // Transform data to match your old structure if needed
  const repositories = data?.repositories?.edges.map((edge) => edge.node);

  return { repositories, loading, refetch };
};

export default useRepositories;
