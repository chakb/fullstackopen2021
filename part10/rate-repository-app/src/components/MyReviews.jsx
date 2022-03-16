import { FlatList, StyleSheet, View } from 'react-native';
import { useMutation } from '@apollo/client';

import useReviews from '../hooks/useReviews';
import ReviewItem from './ReviewItem';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { reviews, fetchMore, refetch } = useReviews({ first: 8, includeReviews: true });
  const [mutate] = useMutation(DELETE_REVIEW);

  if (!reviews) {
    return null;
  }

  const reviewItems = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const onEndReach = () => {
    fetchMore();
  };

  const deleteReview = async (id) => {
    try {
      await mutate({ variables: { deleteReviewId: id } });
      refetch();
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <FlatList
      data={reviewItems}
      renderItem={({ item }) => <ReviewItem review={item} deleteReview={deleteReview} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MyReviews;
