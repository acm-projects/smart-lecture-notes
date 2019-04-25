import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { fetchAll } from '../actions';
import axios from 'axios';

class FolderDetail extends Component {

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    //width: '86%',
                    //marginLeft: '14%',
                    width: '100%',
                    backgroundColor: '#CED0CE'
                }}
            />
        );
    };

    state = {
        searchText: '',
        data: []
    }

    search = async (text) => {
        if (text != '') {
            console.log("Start " + text)
            const response = await axios.post('http://127.0.0.1:8080/fileManage/textSearch/' + text)
            this.setState({ data: response.data })
            //console.log(response.data) 
            console.log("Finish")
        } else {
            this.setState({ data: [] })
            console.log("EMPTY DOG")
        }
    }

    render() {

        const imageUrl = 'http://127.0.0.1:8080/fileManage/image/';

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    value={this.state.searchText}
                    onChangeText={(searchText) => {
                        this.setState({searchText})
                        this.search(searchText);
                    }}
                    placeholder="Search State"
                    autoCapitalize = 'none'
                />

                <FlatList
                    style={styles.listContainer}
                    data={this.state.data}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                console.log('DATA IS ________');
                                console.log(item);
                                console.log(imageUrl + item.image);
                            }}
                        >
                            <Image
                                style={styles.thumbnail}
                                source={{ uri: imageUrl + item.image }}
                            />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemDesc}>{item.desc}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={this.renderSeparator}

                    // Virtualize list
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    all: state.all
});

export default connect(
    mapStateToProps,
    { fetchAll }
)(FolderDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        borderTopWidth: 1,
        borderTopColor: '#CED0CE'
    },
    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 5,
        fontSize: 18,
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)'
    },
    itemTitle: {
        position: 'absolute',
        marginLeft: 80,
        marginTop: 15,
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        fontSize: 18
    },
    itemDesc: {
        position: 'absolute',
        marginLeft: 80,
        marginTop: 40,
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        fontSize: 18
    },
    searchBar: {
        //borderWidth: 1,
        height: 40,
        fontFamily: 'Avenir Next',
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 12
    },
    thumbnail: {
        margin: 15,
        width: 50,
        height: 75
    }
});
