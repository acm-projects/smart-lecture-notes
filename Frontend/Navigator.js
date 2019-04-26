import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation';

import ScheduleScreen from './components/AppStack/ScheduleScreen';
import ClassesScreen from './components/AppStack/ClassesScreen';
import ProfileScreen from './components/AppStack/ProfileScreen';

import PhotoScreen from './components/PhotoScreen';
import Camera from './components/Camera';

import NewClass from './components/NewClass';
import ClassDetail from './components/ClassDetail';
import FolderDetail from './components/FolderDetail';
import TaskDetail from './components/TaskDetail';
import AgendaScreen from './components/AgendaScreen';
import NewTask from './components/NewTask';
import EditTaskDetail from './components/EditTaskDetail';

import ProfileSettings from './components/ProfileSettings';

import LoginScreen from './components/LoginScreen';
import SplashScreen from './components/SplashScreen';
import SignUpScreen from './components/SignUpScreen';
import WalkthroughScreen from './components/WalkthroughScreen';

import SearchScreen from './components/SearchScreen';

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Splash: {
            screen: SplashScreen
        },
        SignUp: {
            screen: SignUpScreen
        },
        Walkthrough: {
            screen: WalkthroughScreen
        }
    },
    {
        initialRouteName: 'Login'
    }
);

const ScheduleStack = createStackNavigator({
    Schedule: {
        screen: ScheduleScreen
    },
    TaskDetail: {
        screen: TaskDetail
    },
    Agenda: {
        screen: AgendaScreen
    },
    NewTask: {
        screen: NewTask
    },
    EditTaskDetail: {
        screen: EditTaskDetail
    }
});

const ClassesStack = createStackNavigator({
    Classes: {
        screen: ClassesScreen
    },
    Class: {
        screen: ClassDetail
    },
    Folder: {
        screen: FolderDetail
    },
    NewClass: {
        screen: NewClass,
        navigationOptions: {
            mode: 'modal'
        }
    },
    Camera: {
        //screen: CameraScreen,
        screen: Camera,
        navigationOptions: {
            header: null
        }
    },
    Photo: {
        screen: PhotoScreen
    }
});

ClassesStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index == 3 || navigation.state.index == 4) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfileScreen
    },
    Settings: {
        screen: ProfileSettings
    },
    Search: {
        screen: SearchScreen
    }
});

const AppStack = createBottomTabNavigator({
    Schedule: {
        screen: ScheduleStack,
        navigationOptions: {
            tabBarLabel: 'To Do',
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
});

export default createAppContainer(
    createSwitchNavigator(
        {
            App: AppStack,
            Auth: AuthStack
        },
        {
            initialRouteName: 'Auth'
        }
    )
);
