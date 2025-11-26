import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const ReviewItem = ({ review, refetchReviews }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(review.createdAt).toLocaleDateString();

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    variables: { id: review.id },
    onCompleted: () => {
      if (refetchReviews) refetchReviews();
      Alert.alert('Review deleted', 'Your review has been successfully deleted.');
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const handleDelete = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteReview() },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View>
          {review.user ? (
            <Text style={styles.username}>{review.user.username}</Text>
          ) : (
            <Text style={styles.username}>{review.repository.fullName}</Text>
          )}
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
      {!review.user && (
        <View style={styles.btnRow}>
          <Pressable
            style={styles.repoBtn}
            onPress={() => navigate(`/repository/${review.repository.id}`)}
          >
            <Text fontWeight='bold' color='textSecondary'>
              View repository
            </Text>
          </Pressable>
          <Pressable style={styles.deleteBtn} onPress={handleDelete}>
            <Text fontWeight='bold' color='textSecondary'>
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(29, 3, 100, 0.2)',
    padding: 10,
    borderRadius: 5,
    margin: 2,
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
  },
  username: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  date: {
    color: 'gray',
    fontSize: 12,
    marginTop: 5,
  },
  reviewText: {
    marginTop: 5,
    marginLeft: 50,
  },
  repoBtn: {
    padding: 2,
    margin: 5,
    backgroundColor: '#0531f7ec',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    padding: 2,
    margin: 5,
    backgroundColor: '#eb380bec',
    paddingVertical: 7,
    borderRadius: 3,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReviewItem;
