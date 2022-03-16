import { StyleSheet, View, Pressable } from 'react-native';
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import * as yup from 'yup'

import useCreateReview from '../hooks/useCreateReview';

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

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .integer()
    .min(0, 'Minimum rating is 0')
    .max(100, 'Maximum rating is 100'),
  text: yup
    .string()
})

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
}

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name='ownerName' placeholder='Owner name' />
      <FormikTextInput style={styles.input} name='repositoryName' placeholder='Repository name' />
      <FormikTextInput style={styles.input} name='rating' placeholder='0' />
      <FormikTextInput style={styles.input} name='text' placeholder='Review' multiline={true} />
      <Pressable onPress={onSubmit} >
        <Text style={styles.button} fontWeight='bold' fontSize='subheading'>Create review</Text>
      </Pressable>
    </View>
  )
}

const Review = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({  ownerName, repositoryName, rating: parseInt(rating), text  });
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default Review;