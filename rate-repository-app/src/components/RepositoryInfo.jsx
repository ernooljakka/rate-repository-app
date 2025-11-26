import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';

const RepositoryInfo = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  if (loading || !data) return null;

  const repo = data.repository;

  return <RepositoryItem item={repo} showGitHubBtn />;
};

export default RepositoryInfo;
