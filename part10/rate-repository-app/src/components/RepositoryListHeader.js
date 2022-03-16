import { View, StyleSheet } from 'react-native';
import TextInput from './TextInput';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  searchFilter: {
    padding: 10,
    backgroundColor: 'white',
  },
});

const OrderPicker = ({ setOrderBy, orderBy }) => {
  return (
    <Picker selectedValue={orderBy} onValueChange={(itemValue) => setOrderBy(itemValue)}>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highestRating" />
      <Picker.Item label="Lowest rated repositories" value="lowestRating" />
    </Picker>
  );
};

const RepositoryListHeader = ({ orderBy, setOrderBy, searchFilter, setSearchFilter }) => {
  return (
    <View>
      <TextInput
        placeholder="Search"
        style={styles.searchFilter}
        value={searchFilter}
        onChangeText={(text) => setSearchFilter(text)}
      />
      <OrderPicker setOrderBy={setOrderBy} orderBy={orderBy} />
    </View>
  );
};

export default RepositoryListHeader;
