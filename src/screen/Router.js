import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentScreen from './StudentScreen';
import TeacherScreen from './TeacherScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerMenu from './component/DrawerMenu';
import Signup from './Signup';
import Signin from './Signin';


const StudentStack = createNativeStackNavigator();

function StudentStackScreen() {
    return (
        <StudentStack.Navigator>
            <StudentStack.Screen name="studentscreen" options={{ headerShown: false }}
                component={StudentScreen}>
            </StudentStack.Screen>
        </StudentStack.Navigator>
    )
}


const TeacherStack = createNativeStackNavigator();

function TeacherStackScreen() {
    return (
        <TeacherStack.Navigator>
            <TeacherStack.Screen name="teacherscreen" options={{ headerShown: false }}
                component={TeacherScreen} >
            </TeacherStack.Screen>
        </TeacherStack.Navigator>
    )
}

const Drawer = createDrawerNavigator();


export default class Router extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator drawerContent={(props) =>
                    <DrawerMenu{...this.props} />}>
                    <Drawer.Screen style={{ flex: 1 }}
                        name="Signin" component={Signin}
                        options={{ headerShown: false }} />
                    <Drawer.Screen style={{ flex: 1 }}
                        name="Signup" component={Signup}
                        options={{ headerShown: false }} />
                    <Drawer.Screen name="studentstackscreen"
                        component={StudentScreen}
                        options={{ headerShown: false }} />
                    <Drawer.Screen name="teacherstackscreen"
                        component={TeacherScreen}
                        options={{ headerShown: false }} />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
