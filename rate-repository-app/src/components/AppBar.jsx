import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const AppBar = () => {
  const { data, loading, refetch } = useQuery(ME);
  const user = data?.me;

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {user ? (
          <Pressable onPress={handleSignOut} style={styles.link}>
            <Text fontWeight='bold' color='textSecondary' fontSize='subheading'>
              Sign out
            </Text>
          </Pressable>
        ) : (
          <>
            <Link to='/signin' style={styles.link}>
              <Text fontWeight='bold' color='textSecondary' fontSize='subheading'>
                Sign In
              </Text>
            </Link>
            <Link to='/signup' style={styles.link}>
              <Text fontWeight='bold' color='textSecondary' fontSize='subheading'>
                Sign Up
              </Text>
            </Link>
          </>
        )}
        <Link to='/' style={styles.link}>
          <Text fontWeight='bold' color='textSecondary' fontSize='subheading'>
            Repositories
          </Text>
        </Link>
        <Link to='/createReview' style={styles.link}>
          <Text fontWeight='bold' color='textSecondary' fontSize='subheading'>
            Create a Review
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 100,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingLeft: 15,
    paddingBottom: 10,
  },
  link: {
    marginRight: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
});

export default AppBar;
