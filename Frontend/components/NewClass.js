import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native'

import axios from 'axios';
import { connect } from 'react-redux';
import { fetchAll } from '../actions';

class NewClass extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            desc: ''
        }
    }

    _createNewClass = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8080/fileManage/createCourse', {
                desc: this.state.title,
                color: 'yellow',
                name: this.state.desc
            })
            await this.props.fetchAll();
            await console.log(response.data)
            await this.props.navigation.goBack();

        } catch(error) {
            console.log(error)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity 
                        style={styles.returnButton}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Text style={styles.returnButtonText}>Return</Text>
                    </TouchableOpacity>

                    <Text style={styles.header}>New Class</Text>

                    <TouchableOpacity 
                        style={styles.nextButton}
                        onPress={this._createNewClass}
                    >
                        <Text style={styles.nextButtonText}>Create</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.titleInput}
                    placeholder="Title"
                    onChangeText={title => this.setState({ title })}
                    value={this.state.title}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        this.secondTextInput.focus()
                    }}
                    blurOnSubmit={false}
                    autoFocus={true}
                />
                <Image style={styles.image} source={{ uri: "https://upload.wikimedia.org/wikipedia/en/3/33/Silicon_valley_title.png" }} />
                <TextInput
                    ref={input => {
                        this.secondTextInput = input
                    }}
                    style={styles.descInput}
                    placeholder="Description"
                    onChangeText={desc => this.setState({ desc })}
                    value={this.state.desc}
                    //multiline={true}
                />
            </View>
        )
    }
}

export default connect(
    null,
    { fetchAll }
)(NewClass);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        paddingTop: 45,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // horizontal center,
        marginBottom: 15
    },
    header: {
        fontFamily: 'Avenir Next',
        fontSize: 22,
        fontWeight: '600',
    },
    nextButton: {
        backgroundColor: '#EFEFEF',
        position: 'absolute',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 100,
        top: 0,
        right: 0,
    },
    nextButtonText: {
        fontFamily: 'Avenir Next',
        fontSize: 16,
        fontWeight: '600',
    },
    returnButton: {
        backgroundColor: '#EFEFEF',
        position: 'absolute',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 100,
        top: 0,
        left: 0,
    },
    returnButtonText: {
        fontFamily: 'Avenir Next',
        fontSize: 16,
        fontWeight: '600',
    },
    titleInput: {
        height: 40,
        borderWidth: 0,
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        fontSize: 20,
        marginTop: -2.5,
        marginBottom: 5,
    },
    descInput: {
        borderWidth: 0,
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        fontSize: 18,
        marginTop: 10,
    },
    image: {
        height: 200,
        borderRadius: 10,
    },
})