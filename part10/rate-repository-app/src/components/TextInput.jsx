import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';


const styles = StyleSheet.create({
  errorInput: {
    borderColor: theme.colors.red
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error && styles.errorInput];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;