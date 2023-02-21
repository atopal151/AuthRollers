import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { NativeBaseProvider, Button, Box, Center, VStack, Heading, } from 'native-base'
import auth from '@react-native-firebase/auth';


export default class TeacherScreen extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <Box style={styles.container}>
          <VStack>
            <Heading style={{color:'#ff6060'}} margin={10} size="xl">
              Welcome Teacher
            </Heading>
            <View style={styles.container}>
              <Image style={styles.studentStyle} source={require("../../assets/teacherimage.jpg")} />
            </View>
            <Button size="sm" margin={10} borderRadius={25} colorScheme="warning" onPress={() => {
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
  container: {
    flex: 1,
    backgroundColor:"white",
    alignItems: 'center',
    justifyContent: 'center'
  },
  studentStyle: {
    width: "100%",
    borderRadius:50,
    height: "50%",
  }
})
