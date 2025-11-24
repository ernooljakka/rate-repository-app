import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const Repositoryitem = ({ item }) => {
  if (!item) return null;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(29, 3, 100, 0.2)',
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 3,
      marginLeft: 3,
      marginRight: 3,
    },
    avatarImg: {
      width: 75,
      height: 75,
      marginLeft: 7,
      marginTop: 7,
    },
    infoColumn: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      paddingLeft: 5,
      paddingTop: 7,
    },
    language: {
      backgroundColor: 'rgba(25, 0, 247, 0.89)',
      alignSelf: 'flex-start',
      borderRadius: 5,
      color: '#ffffff',
      paddingHorizontal: 5,
      paddingVertical: 2,
    },
    topRow: {
      flexDirection: 'row',
      flex: 2,
    },
    bottomRow: {
      flexDirection: 'row',
      paddingTop: 20,
      justifyContent: 'space-around',
      paddingBottom: 10,
    },
  });

  const formatCount = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return String(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          style={styles.avatarImg}
          source={{
            uri: `${item.ownerAvatarUrl}`,
          }}
        />

        <View style={styles.infoColumn}>
          <Text>{item.fullName} </Text>
          <Text style={{ paddingBottom: 3, paddingTop: 3 }}>{item.description} </Text>
          <Text style={styles.language}>{item.language} </Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text> Stars {formatCount(item.stargazersCount)} </Text>
        <Text> Forks: {formatCount(item.forksCount)} </Text>
        <Text> Reviews: {item.reviewCount} </Text>
        <Text> Rating: {item.ratingAverage} </Text>
      </View>
    </View>
  );
};

export default Repositoryitem;
