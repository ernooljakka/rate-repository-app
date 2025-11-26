import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import { useCallback } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');

  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories(orderBy, orderDirection, debouncedKeyword);
  const navigate = useNavigate();

  const handleSort = (value) => {
    switch (value) {
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'highest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
    }
  };

  return (
    <>
      <View>
        <Searchbar
          placeholder='Search repositories'
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#000000',
            borderWidth: 1,
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 5,
          }}
        />
        <Picker
          selectedValue={
            orderBy === 'CREATED_AT'
              ? 'latest'
              : orderBy === 'RATING_AVERAGE' && orderDirection === 'DESC'
                ? 'highest'
                : 'lowest'
          }
          onValueChange={handleSort}
        >
          <Picker.Item label='Latest repositories' value='latest' />
          <Picker.Item label='Highest rated repositories' value='highest' />
          <Picker.Item label='Lowest rated repositories' value='lowest' />
        </Picker>
      </View>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    </>
  );
};

export default RepositoryList;
