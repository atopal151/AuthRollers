import React, { Component } from 'react';

import {
    StyleSheet, ScrollView,
    Image, View, Alert,
    TouchableOpacity, ToastAndroid
} from 'react-native';

import {
    NativeBaseProvider, Center,
    Heading, VStack, FormControl,
    Input, Button, Box, Select, CheckIcon, WarningOutlineIcon,
    Text, TextArea, Link, HStack
} from 'native-base';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
    webClientId: '60287710599-g1sg11gggi2qv382vc8mt3663r09orj1.apps.googleusercontent.com',
});


async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
}


export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            address: '',
            selectRole: '',
            userid: ''
        }
    }

    componentDidMount() {
        if (this.state.userid !== '') {
            this.state.userid = auth().currentUser.uid
            console.log(this.state.userid);
            ToastAndroid.showWithGravityAndOffset(
                'No logged out users found.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        } else {
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
                        <Box safeArea p="2" w="90%" maxW="290" py="8">
                            <Heading mt="1" _dark={{
                                color: "warmGray.200"
                            }} color="coolGray.600" fontWeight="medium" size="xs">
                                Sign up to continue!
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
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Confirm Password</FormControl.Label>
                                    <Input type="password"
                                        backgroundColor="white"
                                        placeholder='retype your password'
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Name - Surname</FormControl.Label>
                                    <Input placeholder='write your name here'
                                        onChangeText={name => this.setState({ name })}
                                        ref={this.props.InputRef}
                                        backgroundColor="white" />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Address</FormControl.Label>
                                    <TextArea aria-label="t1" numberOfLines={2}
                                        backgroundColor="white"
                                        placeholder="write your address here" isInvalid _dark={{
                                            placeholderTextColor: "gray.300"
                                        }} mb="1"
                                        onChangeText={address => this.setState({ address })}
                                        ref={this.props.InputRef} />
                                </FormControl>
                                <FormControl w="100%" maxW="300" isRequired isInvalid>
                                    <FormControl.Label>Choose Role</FormControl.Label>
                                    <Select minWidth="200"
                                        backgroundColor="white"
                                        accessibilityLabel="Choose Role"
                                        onValueChange={selectRole => this.setState({ selectRole })}
                                        placeholder="Choose Role" _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size={5} />
                                        }} mt="1">
                                        <Select.Item label="Student" value="student" />
                                        <Select.Item label="Teacher" value="teacher" />
                                    </Select>
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon
                                        size="xs" />}>
                                        Please make a selection!
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <Button mt="2" backgroundColor='#ff6060' borderRadius={25}
                                    onPress={() => {
                                        auth()
                                            .createUserWithEmailAndPassword(this.state.email, this.state.password)
                                            .then(() => {
                                                firestore().collection('Users').add({
                                                    uid: auth().currentUser.uid,
                                                    email: this.state.email,
                                                    name: this.state.name,
                                                    address: this.state.address,
                                                    role: this.state.selectRole
                                                })
                                                Alert.alert("'User account created", ` Let's Signin `)
                                                this.props.navigation.navigate('Signin')
                                            })
                                            .catch(error => {
                                                if (error.code === 'auth/email-already-in-use') {
                                                    console.log('That email address is already in use!');
                                                }
                                                if (error.code === 'auth/invalid-email') {
                                                    console.log('That email address is invalid!');
                                                }
                                                console.error(error);
                                            });
                                    }} >
                                    Sign up
                                </Button>
                                <HStack mt="6" justifyContent="center">
                                    <Text fontSize="sm" color="coolGray.600" _dark={{
                                        color: "warmGray.200"
                                    }}>
                                        I have an account.{" "}
                                    </Text>
                                    <Link _text={{
                                        color: "#ff6060",
                                        fontWeight: "medium",
                                        fontSize: "sm"
                                    }} onPress={() => {
                                        this.props.navigation.navigate("Signin")
                                    }}>
                                        Sign In
                                    </Link>
                                </HStack>
                                <View style={styles.imageStyle}>
                                    <TouchableOpacity onPress={() => {
                                        if (this.state.selectRole === "" && this.state.address === "") {
                                            Alert.alert("Dikkat!", "Lütfen Bir rol seçin ve Adres Bilgilerini Girin")
                                        } else if (this.state.selectRole !== "" && this.state.address !== "") {
                                            console.log(this.state.selectRole);
                                            onGoogleButtonPress().then(() => {
                                                firestore().collection('Users').add({
                                                    uid: auth().currentUser.uid,
                                                    email: auth().currentUser.email,
                                                    name: auth().currentUser.displayName,
                                                    address: this.state.address,
                                                    role: this.state.selectRole
                                                }).then(() => {
                                                    this.props.navigation.navigate("Signin")
                                                })
                                            })
                                        }
                                    }}>
                                        <Image style={styles.imageIcon} source={require("../../assets/google.png")} />
                                    </TouchableOpacity>
                                    <Button size="sm" margin={10} borderRadius={25} colorScheme="warning"
                                        onPress={() => {
                                            auth()
                                                .signOut()
                                                .then(() => this.props.navigation.navigate("Signin"));
                                        }}>
                                        Sign Out
                                    </Button>
                                </View>
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
    imageStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30
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
