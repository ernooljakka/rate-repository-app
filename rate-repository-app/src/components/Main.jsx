import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import AppBar from './AppBar';
import { Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import UserReviews from './userReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/createReview' element={<ReviewForm />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/repository/:id' element={<SingleRepository />} />
        <Route path='/userReview' element={<UserReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
