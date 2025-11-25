import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';

const useSignIn = () => {
  const authStorage = new AuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    const accessToken = response.data.authenticate.accessToken;

    await authStorage.setAccessToken(accessToken);

    await apolloClient.resetStore();

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
