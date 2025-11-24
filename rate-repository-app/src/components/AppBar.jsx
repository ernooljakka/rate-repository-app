import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';

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

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/signin' style={styles.link}>
          <Text fontWeight='bold' color='textSecondary' fontSize='subheading'>
            Sign In
          </Text>
        </Link>

        <Link to='/' style={styles.link}>
          <Text fontWeight='bold' color='textSecondary' fontSize='subheading'>
            Repositories
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
