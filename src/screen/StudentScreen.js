import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { NativeBaseProvider, Button, Box, Center, VStack, Heading, } from 'native-base'
import auth from '@react-native-firebase/auth';


export default class StudentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }




  render() {
    const { route } = this.props;
    const { surname, rolles, mail, userAddress } = route.params;
    return (
      <NativeBaseProvider>
        <Box style={styles.container}>
          <VStack>
            <View style={styles.container}>
              <Image style={styles.studentStyle} source={require("../../assets/studentimage.jpg")} />
            </View>
            <View style={styles.userInfo}>
              <Heading style={{ color: '#130f40' }} margin={10} size="xl">
                Welcome Student
              </Heading>
              <Heading margin={2} color='#30336b'>
                Name: {surname}
              </Heading>
              <Heading margin={2} color='#30336b'>
                Role: {rolles}
              </Heading>
              <Heading margin={2} color='#30336b'>
                Email : {mail}
              </Heading>
              <Heading margin={10} color='#30336b'>
                Address : {userAddress}
              </Heading>
            </View>

            <Button size="sm" margin={10} borderRadius={25} colorScheme="warning"
              onPress={() => {
                auth()
                  .signOut()
                  .then(() => this.props.navigation.navigate("Signin"));
              }}>
              Sign Out
            </Button>
          </VStack>
        </Box>
      </NativeBaseProvider>
    )
  }
}

const styles = StyleSheet.create({
  userInfo: {
    margin: 10,
    elevation: 4,
    backgroundColor: '#dff9fb',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center'
  },

  studentStyle: {
    width: "50%",
    borderRadius: 50,
    height: "50%",
  }
})

