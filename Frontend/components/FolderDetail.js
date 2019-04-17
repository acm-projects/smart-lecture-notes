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

    state = {
        course: [
            {
                title: 'Week 1',
                data: [
                    '1.1 Calculus Review',
                    '1.2 Matrix Operations',
                    '2.1 Dot Product',
                    '2.2 Plane Systems',
                ],
            },
            {
                title: 'Week 2',
                data: [
                    '2.3 Partial Derivatives',
                    '2.4 Limits',
                    '2.5 Determinants',
                ],
            },
            {
                title: 'Family',
                data: ['Emma', 'Emi', 'Emiliano', 'Ernesto'],
            },
            {
                title: 'Friends',
                data: [
                    'Jackson',
                    'James',
                    'Jillian',
                    'Jimmy',
                    'Joel',
                    'John',
                    'Julie',
                ],
            },
        ],
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
                    data={[
                        { key: 'Item 1' },
                        { key: 'Item 3' },
                        { key: 'Item 5' },
                        { key: 'Item 7' },
                    ]}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                console.log(index)
                            }}
                        >
                            <Text style={styles.item} key={index}>
                                {item.key}
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