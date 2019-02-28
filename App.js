import React from 'react';
import {
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation'

import ScheduleScreen from './components/AppStack/ScheduleScreen';
import ClassesScreen from './components/AppStack/ClassesScreen';
import ProfileScreen from './components/AppStack/ProfileScreen';

import ClassDetail from './components/ClassDetail'
import ListCard from './components/ListCard'

import ProfileSettings from './components/ProfileSettings'

//const ScheduleStack;

const ClassesStack = createStackNavigator({
    Classes: {
        screen: ClassesScreen
    },
    Detail: {
        screen: ClassDetail
    }
})

const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfileScreen
    },
    Settings: {
        screen: ProfileSettings
    }
})

const AppStack = createBottomTabNavigator({
    Schedule: {
        screen: ScheduleScreen,
        navigationOptions: {
            tabBarLabel: 'New Note',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-calendar" color={tintColor} size={24} />
            )
        }
    },
    Classes: {
        screen: ClassesStack,
        navigationOptions: {
            tabBarLabel: 'Classes',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-albums" color={tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-person" color={tintColor} size={24} />
            )
        }
    }
})

const App = createAppContainer(AppStack)

export default App;