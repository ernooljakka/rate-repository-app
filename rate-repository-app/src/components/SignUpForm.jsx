import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Text from './Text';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (values) => {
    try {
      const { data } = await createUser({
        variables: { user: { username: values.username, password: values.password } },
      });

      await signIn({ username: values.username, password: values.password });

      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <View>
      <Formik
        initialValues={{ username: '', password: '', passwordConfirm: '' }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          username: Yup.string()
            .required('Username is required')
            .min(5, 'Must be at least 5 characters')
            .max(30, 'Must be at most 30 characters'),
          password: Yup.string()
            .required('Password is required')
            .min(5, 'Must be at least 5 characters')
            .max(50, 'Must be at most 50 characters'),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required'),
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
              placeholder='Password'
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder='Confirm Password'
              secureTextEntry
              value={values.passwordConfirm}
              onChangeText={handleChange('passwordConfirm')}
            />
            {touched.passwordConfirm && errors.passwordConfirm && (
              <Text style={styles.errorText}>{errors.passwordConfirm}</Text>
            )}

            <Pressable style={styles.submitbtn} onPress={handleSubmit}>
              <Text color='textSecondary'>Sign Up</Text>
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
    marginBottom: 5,
  },
});

export default SignUpForm;
