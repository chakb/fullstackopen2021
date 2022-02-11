import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';
import Text from './Text';


const styles = StyleSheet.create({
  tab: {
    marginLeft: 20,
    color: theme.colors.white
  },
});

const AppBarTab = ({ linkTo, text }) => {
  return (
    <Pressable>
      <Link to={linkTo}>
        <Text style={styles.tab} fontSize='subheading' fontWeight='bold'>{text}</Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab;