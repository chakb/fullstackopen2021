import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

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
          ? <>
            <AppBarTab linkTo={'/review'} text={'Create a review'} />
            <AppBarTab linkTo={'/myreviews'} text={'My reviews'} />
            <AppBarTab linkTo={'/'} text={'Sign out'} onPress={signOut} />
          </>
          : <>
            <AppBarTab linkTo={'/signin'} text={'Sign in'} />
            <AppBarTab linkTo={'/signup'} text={'Sign up'} />
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;