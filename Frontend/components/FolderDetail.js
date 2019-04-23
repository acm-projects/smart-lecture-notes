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

    state = {
        text: "",
        documents : []
    };

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', ''),
            headerRight: (
                <TouchableOpacity
                    style={{ paddingRight: 10 }}
                    onPress={() => {
                        navigation.navigate('Camera', {
                            _foldersIndex: navigation.getParam('_foldersIndex'),
                            _foldersID: navigation.getParam('_foldersID')
                        });
                    }}
                >
                    <Ionicons name="ios-add" color="#007AFF" size={36} />
                </TouchableOpacity>
            )
        };
    };

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

    

    async search() {
        
        
        const { navigation } = this.props;

        const _classIndex = navigation.getParam('_classIndex');
        const _foldersIndex = navigation.getParam('_foldersIndex');
        
        let docArray = this.props.all[_classIndex].folders[_foldersIndex].documents;
       
       

        if (this.state.text != "") {

            let url = 'http://127.0.0.1:8080/fileMange/textSearch';
            url += this.state.text;

            await axios.post(url, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(docs => {

                docArray = docs;

               
            })

            
        }
      
            console.log(docArray, "<<<<<< This is ours");
            return{docArray}
       
    }

    






    render() {
        const { navigation } = this.props;

        const _classIndex = navigation.getParam('_classIndex');
        const _foldersIndex = navigation.getParam('_foldersIndex');



        const imageUrl = 'http://127.0.0.1:8080/fileManage/image/';

        console.log('DATA IS ________');
        console.log(_classIndex + ' ' + _foldersIndex);
        console.log(
            this.props.all[_classIndex].folders[_foldersIndex].documents
        );

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    placeholder='Search State'
                    onChangeText={
                        (text) => this.setState({ text, documents : this.search() })
                    }
                    value={this.state.text}
                />

                <FlatList
                    style={styles.listContainer}
                    data={this.state.documents}
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
