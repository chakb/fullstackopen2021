import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItemWrap = ({ item, handlePress }) => {
  return (
    <Pressable onPress={() => handlePress(item.id)}>
      <RepositoryItem item={item} />
    </Pressable>
  );
};

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  handlePress,
  setOrderBy,
  orderBy,
  searchFilter,
  setSearchFilter,
}) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <RepositoryItemWrap item={item.item} handlePress={handlePress} />}
      ListHeaderComponent={
        <RepositoryListHeader
          setOrderBy={setOrderBy}
          orderBy={orderBy}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const setOrderVariables = (orderBy) => {
  let variables;
  switch (orderBy) {
    case 'latest':
      variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      break;
    case 'highestRating':
      variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      break;
    case 'lowestRating':
      variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      break;
    default:
      break;
  }
  return variables;
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('latest');
  const [searchFilter, setSearchFilter] = useState('');
  const [searchKeyword] = useDebounce(searchFilter, 500);
  const { repositories, fetchMore } = useRepositories({
    first: 8,
    searchKeyword,
    ...setOrderVariables(orderBy)
  });
  const navigate = useNavigate();

  const handlePress = (id) => {
    navigate(`/repository/${id}`);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      handlePress={handlePress}
      onEndReach={onEndReach}
      setOrderBy={setOrderBy}
      orderBy={orderBy}
      searchFilter={searchFilter}
      setSearchFilter={setSearchFilter}
    />
  );
};

export default RepositoryList;
