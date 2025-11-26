import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';
import { GET_REPOSITORY_REVIEWS } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_REPOSITORY_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  if (loading) return null;

  const reviews = data?.repository?.reviews?.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo />}
    />
  );
};

export default SingleRepository;
