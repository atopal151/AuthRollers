import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { NativeBaseProvider, Button, Box, Center, VStack, Heading, } from 'native-base'
import auth from '@react-native-firebase/auth';


export default class StudentScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NativeBaseProvider>
        <Box style={styles.container}>
          <VStack>
            <Heading style={{color:'#ff6060'}} margin={10} size="xl">
              Welcome Student
            </Heading>
            <View style={styles.containerImage}>
              <Image style={styles.studentStyle} source={require("../../assets/studentimage.jpg")} />
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
  container: {
    flex: 1,
    backgroundColor:"white",
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  studentStyle: {
    width: "100%",
    borderRadius: 50,
    height: "65%",
  }
})

