import { Formik } from 'formik';
import { View, Pressable, TextInput } from 'react-native';
import Text from '../Text';

const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, values }) => (
        <View>
          <TextInput
            testID='usernameInput'
            onChangeText={handleChange('username')}
            value={values.username}
            placeholder='Username'
          />
          <TextInput
            testID='passwordInput'
            onChangeText={handleChange('password')}
            value={values.password}
            secureTextEntry
            placeholder='Password'
          />
          <Pressable testID='submitButton' onPress={handleSubmit}>
            <Text>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignInContainer;
