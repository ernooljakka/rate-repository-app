import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import useCurrentUser from '../hooks/useCurrentUser';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: { height: 10 },
  reviewContainer: { padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5 },
  reviewText: { marginVertical: 5 },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { user, loading, refetch } = useCurrentUser(true);
  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;

  const reviews = user?.reviews?.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.repository.id}`)}>
          <ReviewItem review={item} refetchReviews={refetch} />
        </Pressable>
      )}
    />
  );
};

export default UserReviews;
