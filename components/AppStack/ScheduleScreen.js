// import React, { Component } from 'react';
// import {
//     SafeAreaView,
//     Text,
//     StyleSheet
// } from 'react-native'
// import { Agenda } from 'react-native-calendars'

// import AgendaScreen from '../AgendaScreen'

// class ScheduleScreen extends Component {
//     render() {
//         return (
//             <SafeAreaView style={styles.container}>
//                 {/* <AgendaScreen /> */}
//                 <Text style={styles.text}>
//                     ScheduleScreen
//                 </Text>
//             </SafeAreaView>
//         )
//     }
// }

// export default ScheduleScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     text: {
//         fontFamily: 'Avenir Next',
//         fontSize: 20,
//     }
// })

import React from "react";
import { 
    Text, 
    View, 
    TouchableOpacity,
    Image
} from "react-native";
import { 
    Camera, 
    Permissions 
} from "expo";

export default class CameraExample extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "transparent",
                                flexDirection: "row"
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: "flex-end",
                                    alignItems: "center"
                                }}
                                onPress={() => {
                                    this.setState({
                                        type:
                                            this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                    });
                                }}
                            >
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                                >
                                    {" "}
                                    Flip{" "}
                                </Text>
                            </TouchableOpacity>

                            {/* Snap */}
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignSelf: "flex-end",
                                    alignItems: "center",
                                    justifyContent: 'center',
                                }}
                                onPress={() => {
                                    if (this.camera) {
                                        let photo = this.camera.takePictureAsync();
                                        console.log(photo)
                                    }
                                }}
                            >
                                <Image
                                    style={{
                                       height: 60,
                                       width: 60 
                                    }}
                                    source={{uri: 'http://icons.iconarchive.com/icons/martz90/circle/256/video-camera-icon.png'}}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: "flex-end",
                                    alignItems: "center"
                                }}
                                onPress={() => {
                                    this.setState({
                                        type:
                                            this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                    });
                                }}
                            >
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                                >
                                    {" "}
                                    Flip{" "}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </Camera>
                </View>
            );
        }
    }
}
