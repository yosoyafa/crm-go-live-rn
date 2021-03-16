import React from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import SearchBar from './SearchBar';

const AutocompleteInput = ({ placeholder, data, term, onChangeText, onChangedText, onSelect, onClose, onCleanUp }) => {
    return (<>
        <SearchBar
            term={term}
            placeholder={placeholder}
            onChangedText={onChangedText}
            onChangeText={onChangeText}
        />

        {!!term && <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'black' }}></View>}
            renderItem={({ item }) => {
                return <TouchableOpacity
                    style={{ marginHorizontal: 10, marginVertical: 15 }}
                    onPress={() => {
                        onSelect(item);
                        onClose();
                        onCleanUp();
                    }}>
                    <Text>{item.barrio}</Text>
                </TouchableOpacity>
            }}
        />}
    </>);
}

export default AutocompleteInput;