import { StyleSheet, View, TextInput, Button, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const reviewInput = {
        repositoryName: values.repoName,
        ownerName: values.username,
        rating: Number(values.rating),
        text: values.textReview,
      };

      const { data } = await createReview({
        variables: { review: reviewInput },
      });

      const repositoryId = data.createReview.repositoryId;

      resetForm();
      navigate(`/repository/${repositoryId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <Formik
        initialValues={{ username: '', repoName: '', rating: '', textReview: '' }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          username: Yup.string().required('Repository owner name is required'),
          repoName: Yup.string().required('Repository name is required'),
          rating: Yup.number()
            .typeError('Rating must be a number')
            .required('Rating is required')
            .min(0, 'Rating must be at least 0')
            .max(100, 'Rating cannot be more than 100'),
        })}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder='Username'
              value={values.username}
              onChangeText={handleChange('username')}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder='Repository Name'
              value={values.repoName}
              onChangeText={handleChange('repoName')}
            />
            {touched.repoName && errors.repoName && (
              <Text style={styles.errorText}>{errors.repoName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder='Rating (0-100)'
              keyboardType='numeric'
              value={values.rating}
              onChangeText={handleChange('rating')}
            />
            {touched.rating && errors.rating && (
              <Text style={styles.errorText}>{errors.rating}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder='Review text (optional)'
              value={values.textReview}
              onChangeText={handleChange('textReview')}
              multiline
            />

            <Pressable style={styles.submitbtn} onPress={handleSubmit}>
              <Text color='textSecondary'>Create Review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 2,
    margin: 5,
    borderRadius: 3,
    paddingHorizontal: 7,
  },
  submitbtn: {
    padding: 2,
    margin: 5,
    backgroundColor: '#0531f7ec',
    paddingVertical: 7,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginLeft: 5,
    marginBottom: 2,
  },
});

export default ReviewForm;
