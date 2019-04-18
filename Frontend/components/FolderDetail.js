import React, { Component } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux';
import { fetchAll } from '../actions'

class FolderDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', ''),
            headerRight: (
                <TouchableOpacity style={{ paddingRight: 10 }}>
                    <Ionicons name="ios-add" color="#007AFF" size={36} />
                </TouchableOpacity>
            ),
        }
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    //width: '86%',
                    //marginLeft: '14%',
                    width: '100%',
                    backgroundColor: '#CED0CE',
                }}
            />
        )
    }

    render() {

        const { navigation } = this.props

        const _classIndex = navigation.getParam('_classIndex')
        const _foldersIndex = navigation.getParam('_foldersIndex')

        console.log("DATA IS ________")
        console.log(_classIndex + " " + _foldersIndex);
        console.log(this.props.all[_classIndex].folders[_foldersIndex].documents)

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    // value={this.state.searchText}
                    // onChange={this.setSearchText.bind(this)}
                    placeholder="Search State"
                />

                <FlatList
                    style={styles.listContainer}
                    data={this.props.all[_classIndex].folders[_foldersIndex].documents}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                console.log("DATA IS ________")
                                console.log(item)
                            }}
                        >
                            <Text style={styles.item} key={index}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    all: state.all
})

export default connect(
    mapStateToProps,
    { fetchAll }
)(FolderDetail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        paddingLeft: 15,
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        fontSize: 18,
        height: 44,
    },
    searchBar: {
        //borderWidth: 1,
        height: 40,
        fontFamily: 'Avenir Next',
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 12
    },
})