import { StyleSheet, View, Pressable } from 'react-native';
import { useNavigate } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup'
import YupPassword from 'yup-password';
YupPassword(yup);


import useSignIn from '../hooks/useSignIn';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white
  },
  input: {
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.mainBackground
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 20,
    borderRadius: 5,
    margin: 20,
    textAlign: 'center'
  }

});

const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
  password: yup
    .string()
    // .password()
    .required()
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name='username' placeholder='Username' />
      <FormikTextInput style={styles.input} name='password' placeholder='Password' secureTextEntry={true} />
      <Pressable onPress={onSubmit} >
        <Text style={styles.button} fontWeight='bold' fontSize='subheading'>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      navigate('/');
      console.log('Sign in: ',data);
    } catch (e) {
      console.log(e);
    }
  };

  return (

    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>

  );
};

export default SignIn;