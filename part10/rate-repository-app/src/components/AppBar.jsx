import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { ScrollView } from 'react-native-web';

import { useQuery } from '@apollo/client';
import { AUTHENTICATED_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.appBarBackground
  },
  // ...
});

const AppBar = () => {
  const { data } = useQuery(AUTHENTICATED_USER);
  const { signOut } = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab linkTo={'/'} text={'Repositories'} />
        {data?.me
          ? <AppBarTab linkTo={'/'} text={'Sign out'} onPress={signOut} />
          : <AppBarTab linkTo={'/signin'} text={'Sign in'} />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;