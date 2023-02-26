import React, { Component } from 'react'
import { StyleSheet, View, Image} from 'react-native'
import { NativeBaseProvider, Button, Box, VStack, Heading, } from 'native-base'
import auth from '@react-native-firebase/auth';

export default class TeacherScreen extends Component {
  render() {
    const { route } = this.props;
    const { surname, rolles, mail, userAddress } = route.params;
    return (
      <NativeBaseProvider>
        <Box style={styles.container}>
          <VStack>
            <View style={styles.studentInfo}>
              <Image style={styles.studentStyle} source={require("../../assets/teacherimage.jpg")} />
              <Heading color='#2f3640' >
                {surname}
              </Heading>
              <Heading margin={8} color='#ced6e0' size="xs">
                {mail}
              </Heading>
            </View>
            <View style={styles.gradView}>
              <View style={{ elevation: 20, borderRadius: 20, margin: 20, backgroundColor: 'white', height: 80, width: '90%', alignItems: 'center', justifyContent: 'center' }}>
                <Heading margin={2} color='#cc8e35' size="xs">
                  Role: {
                    <Heading margin={2} color='#aaa69d' size="xs">
                      {rolles}
                    </Heading>}
                </Heading>
              </View>
            </View>
            <View style={styles.gradView}>
              <View style={{ elevation: 20, borderRadius: 20, margin: 20, backgroundColor: 'white', height: 80, width: '90%', alignItems: 'center', justifyContent: 'center' }}>
                <Heading margin={2} color='#cc8e35' size="xs">
                  Address: {<Heading margin={2} color='#aaa69d' size="xs">
                    {userAddress}
                  </Heading>}
                </Heading>
              </View>
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
  headBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 250,
    width: '100%',
    backgroundColor: '#1572de',
  },
  gradView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    margin: 10,
    elevation: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  studentStyle: {
    margin: 10,
    width: 120,
    borderRadius: 50,
    height: 120,
  },
  studentInfo: {
    width: 310,
    margin: 10,
    elevation: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: "center",
    justifyContent: 'center'
  }
})
