import { StyleSheet, View, Pressable } from 'react-native';
import { useNavigate } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup'

import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

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
  },
  error: {
    backgroundColor: theme.colors.white,
    marginTop: 5,
    color: theme.colors.red
  }

});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be at least 1 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be at most 50 characters long')
    .required('Password is required'),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], 'Password doesn\'t match')
    .required('Password confirmation is required')
})

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name='username' placeholder='Username' />
      <FormikTextInput style={styles.input} name='password' placeholder='Password' secureTextEntry={true} />
      <FormikTextInput style={styles.input} name='passwordConfirm' placeholder='Repeat Password' secureTextEntry={true} />
      <Pressable onPress={onSubmit} >
        <Text style={styles.button} fontWeight='bold' fontSize='subheading'>Sign up</Text>
      </Pressable>
    </View>
  );
}

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp, { error }] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const signUpData = await signUp({ username, password });
      console.log('signUpData', signUpData.data);
      const signInData = await signIn({ username, password });
      navigate('/');
      console.log('Sign in: ', signInData.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) =>
          <>
            {error && <Text style={styles.error}>{error.message}</Text>}
            <SignUpForm onSubmit={handleSubmit} />
          </>
        }
      </Formik>

    </>
  );
};

export default SignUp;