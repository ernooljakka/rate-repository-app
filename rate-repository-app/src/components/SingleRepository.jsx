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

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first: 3 },
  });

  if (loading || !data) return null;

  const handleFetchMore = () => {
    const pageInfo = data?.repository?.reviews?.pageInfo;

    if (!pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        id,
        after: pageInfo.endCursor,
        first: 3,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        return {
          repository: {
            ...previousResult.repository,
            reviews: {
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
              pageInfo: fetchMoreResult.repository.reviews.pageInfo,
              __typename: previousResult.repository.reviews.__typename,
            },
          },
        };
      },
    });
  };

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 200 }}
      data={data.repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.1}
    />
  );
};

export default SingleRepository;
