import { StyleSheet, View, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  reviewInfoContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  reviewDetais: {
    flexShrink: 1,
  },
  rating: {
    flexShrink: 0,
    color: theme.colors.primary,
    width: 50,
    height: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 25,
    marginRight: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewText: {
    marginTop: 5,
  },
  buttonContainer: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 5,
    flexGrow: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: theme.colors.red,
    padding: 20,
    borderRadius: 5,
    flexGrow: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: 'center',
  },
});

const ReviewItem = ({ review, deleteReview }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    Alert.alert('Delete review', `Are you sure you want to delete this review?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => deleteReview(review.id) },
    ]);
  };

  const handleView = () => {
    navigate(`/repository/${review.repository.id}`);
  };

  // Single review item
  return (
    <View style={styles.container}>
      <View style={styles.reviewInfoContainer}>
        <Text style={styles.rating} fontWeight={'bold'} fontSize={'subheading'}>
          {review.rating}
        </Text>
        <View style={styles.reviewDetais}>
          <Text fontWeight={'bold'}>
            {review.user ? review.user.username : review.repository.fullName}
          </Text>
          <Text color={'textSecondary'}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
      {review.repository ? (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.viewButton} onPress={handleView}>
            <Text style={styles.buttonText} fontWeight="bold" fontSize="subheading">
              View repository
            </Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText} fontWeight="bold" fontSize="subheading">
              Delete review
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default ReviewItem;
