import { useParams } from 'react-router-native';
import { FlatList, StyleSheet, View } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerSeparator: {
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ id, first: 8 });

  if (!repository) {
    return null;
  }

  const reviews = repository.reviews ? repository.reviews.edges.map((edge) => edge.node) : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} showGithubButton={true} />}
      ListHeaderComponentStyle={styles.headerSeparator}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
