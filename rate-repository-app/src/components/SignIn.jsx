import Text from './Text';
import { StyleSheet, View, TextInput, Button, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignIn = () => {
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

  return (
    <View>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(4, 'Username must be at least 4 characters long')
            .required('Username required'),
          password: Yup.string()
            .min(4, 'Password must be at least 4 characters long')
            .required('Password required'),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              value={values.username}
              placeholder='Username'
              onChangeText={handleChange('username')}
            />

            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              secureTextEntry
              value={values.password}
              placeholder='Password'
              onChangeText={handleChange('password')}
            />

            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Pressable style={styles.submitbtn} onPress={handleSubmit}>
              <Text color='textSecondary'> Sign in </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
