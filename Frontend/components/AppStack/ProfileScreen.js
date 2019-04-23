import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

//import { Ionicons } from '@expo/vector-icons';

// import OrderHistory from './OrderHistory'
// import Schedule from './Schedule'

class ProfileScreen extends Component {
	static navigationOptions = {
        header: null
    }; 
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.titleBar}>
					<Image
						style={styles.avatar}
						source={require('../../assets/huy.jpg')}
					/>
					<Text style={styles.name}>Huy Pham</Text>
				</View>
				<View style={styles.container}>
					<View style={{ width: '100%',
									justifyContent: 'center',
									backgroundColor: '#ffcc5c',
									height: 40,
									flex: 1,
									padding: 30,
									marginTop: 20,
									alignItems: 'center' }}
					>
						<Text style={styles.setting}>Edit Profile</Text>
					</View>
					<View style={{ width: '100%',
									justifyContent: 'center',
									backgroundColor: '#ffb3b3',
									height: 40,
									flex: 1,
									padding: 30,
									
									alignItems: 'center' }}
					>
						<Text style={styles.setting}>Export Notes</Text>
					</View>
					<View style={{ width: '100%',
									justifyContent: 'center',
									backgroundColor: '#98bdf0',
									height: 40,
									flex: 1,
									padding: 30,
									alignItems: 'center' }}
					>
						<Text style={styles.setting}>Settings</Text>
					</View>
					<View style={{ width: '100%',
									justifyContent: 'center',
									backgroundColor: 'white',
									height: 80,
									flex: 1,
									padding: 40,
									alignItems: 'center' }}
					/>
					<View style={{ width: '100%',
									justifyContent: 'center',
									backgroundColor: '#ff6f69',
									height: 40,
									flex: 1,
									padding: 30,									
									alignItems: 'center' }}
					>
						<Text style={styles.setting}>Log Out</Text>
					</View>
				</View>
			</View>	
		);
	}
}

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		backgroundColor: 'rgb(255, 255, 255)',
		justifyContent: 'center'
	},
	segmentedIOS: {
		marginTop: 10,
		marginLeft: 70,
		marginRight: 70,
	},
	avatar: {
		width: 80,
		height: 80,
		backgroundColor: 'black',
		borderRadius: 40,
	},
	titleBar: {
		width: '100%',
		marginTop: 70,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
		fontFamily: 'Avenir Next',
		color: '#b8bece',
		fontWeight: '500',
	},
	subTitle: {
		fontSize: 15,
		fontFamily: 'Avenir Next',
		color: '#b8bece',
		fontWeight: '600',
		marginLeft: 30,
		marginTop: 25,
		textTransform: 'uppercase'
	},
	name: {
		fontSize: 20,
		fontFamily: 'Avenir Next',
		color: '#3c4560',
		fontWeight: '700',
		paddingTop: 5
	},
	classes: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
	},
	text: {
		fontFamily: 'Avenir Next',
		fontSize: 20,
	},
	setting: {
		fontSize: 16,
		fontFamily: 'Avenir Next',
		color: 'white',
		fontWeight: '600',
	}
});
