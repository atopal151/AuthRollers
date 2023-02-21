import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, View, Alert } from 'react-native'
import {
    Box, Text, Heading,
    VStack, FormControl, Input,
    Link, Button, HStack, Center,
    NativeBaseProvider
} from "native-base";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userid: '',
            role: '',
            name: '',
            user: [],
        }
    }

    componentDidMount() {


        if (auth().currentUser !== null) {
            this.state.userid = auth().currentUser.uid
            console.log(this.state.userid);
            firestore()
                .collection('Users')
                .where('uid', '==', this.state.userid)
                .get()
                .then(querySnapshot => {
                    let user = []
                    console.log(querySnapshot.size);
                    querySnapshot.forEach(documentSnapshot => {
                        user.push(documentSnapshot.data())
                    });
                    this.setState({ user })
                    this.state.user.map((users) => {
                        this.state.name = users.name
                        this.state.role = users.role
                        console.log(this.state.role);
                    })
                    Alert.alert("There is a logged in user", ` UID : ${this.state.userid} 
                    ${this.state.name} ${this.state.role}`)
                    if (this.state.role === 'teacher') {
                        console.log("User Teacher");
                        this.props.navigation.navigate("teacherstackscreen")
                    } else if (this.state.role === 'student') {
                        console.log("User Student");

                        this.props.navigation.navigate("studentstackscreen")
                    }
                });
        } else {

            Alert.alert("No logged out users found.", "Please Signin or Signup")
        }
    }
    render() {
        return (
            <ScrollView>
                <NativeBaseProvider>
                    <Center w="100%">
                        <View style={styles.backBird}>
                            <Image style={styles.birdStyle}
                                source={require("../../assets/bird.png")} />
                        </View>
                        <View>
                            <Heading size="xl" fontWeight="600" color="#ff6060" _dark={{
                                color: "warmGray.50"
                            }}>
                                Welcome to FLY
                            </Heading>
                        </View>
                        <Box safeArea p="2" py="8" w="90%" maxW="290">


                            <Heading mt="1" _dark={{
                                color: "warmGray.200"
                            }} color="coolGray.600" fontWeight="medium" size="xs">
                                Sign in to continue!
                            </Heading>

                            <VStack space={3} mt="5">
                                <FormControl>
                                    <FormControl.Label>Email Address</FormControl.Label>
                                    <Input placeholder='write your email here'
                                        backgroundColor="white"
                                        onChangeText={email => this.setState({ email })}
                                        ref={this.props.InputRef} />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Password</FormControl.Label>
                                    <Input type="password"
                                        backgroundColor="white"
                                        placeholder='write your password here'
                                        onChangeText={password => this.setState({ password })}
                                        ref={this.props.InputRef} />

                                    <Link _text={{
                                        fontSize: "xs",
                                        fontWeight: "500",
                                        color: "#ff6060"
                                    }} alignSelf="flex-end" mt="1">
                                        Forget Password?
                                    </Link>
                                </FormControl>
                                <Button mt="2" backgroundColor="#ff6060" borderRadius={25}
                                    onPress={() => {
                                        auth()
                                            .signInWithEmailAndPassword(this.state.email, this.state.password)
                                            .then(() => {

                                                //Alert.alert("Sign In")
                                                console.log("Sign in");
                                                this.state.userid = auth().currentUser.uid
                                                console.log(this.state.userid);
                                                firestore()
                                                    .collection('Users')
                                                    .where('uid', '==', this.state.userid)
                                                    .get()
                                                    .then(querySnapshot => {
                                                        let user = []
                                                        console.log(querySnapshot.size);
                                                        querySnapshot.forEach(documentSnapshot => {
                                                            user.push(documentSnapshot.data())
                                                        });
                                                        this.setState({ user })
                                                        this.state.user.map((users) => {
                                                            this.state.name = users.name
                                                            this.state.role = users.role
                                                            console.log(this.state.role);
                                                        })
                                                        Alert.alert("There is a logged in user", ` UID : ${this.state.userid} 
                                                    ${this.state.name} ${this.state.role}`)
                                                        if (this.state.role === 'teacher') {
                                                            console.log("User Teacher");
                                                            this.props.navigation.navigate("teacherstackscreen")
                                                        } else if (this.state.role === 'student') {
                                                            console.log("User Student");

                                                            this.props.navigation.navigate("studentstackscreen")
                                                        }
                                                    });


                                            })
                                            .catch(error => {
                                                if (error.code === 'auth/email-already-in-use') {
                                                    console.log('That email address is already in use!');
                                                }

                                                if (error.code === 'auth/invalid-email') {
                                                    console.log('That email address is invalid!');
                                                }

                                                console.error("Can't find User" + error);
                                            });
                                    }}>
                                    Sign in
                                </Button>

                                <HStack mt="6" justifyContent="center">
                                    <Text fontSize="sm" color="coolGray.600" _dark={{
                                        color: "warmGray.200"
                                    }}>
                                        I'm a new user.{" "}
                                    </Text>
                                    <Link _text={{
                                        color: "#ff6060",
                                        fontWeight: "medium",
                                        fontSize: "sm"
                                    }} onPress={() => {
                                        this.props.navigation.navigate("Signup")
                                    }}>
                                        Sign Up
                                    </Link>
                                </HStack>
                            </VStack>
                        </Box>
                    </Center>
                </NativeBaseProvider>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    birdStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 120,

    },
    backBird: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 150,
        width: 200,
        height: 200,
        margin: 20
    }
})