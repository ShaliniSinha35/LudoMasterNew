import { View, Text, SafeAreaView, StatusBar, Platform, Alert } from 'react-native'
import React, {useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import APP from "./src/App"
import { NativeBaseProvider } from 'native-base';
import LoginScreen from './src/screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const App = () => {

  const [verified,setVerified] = useState(false)
  const [mobile,setMobile]= useState(null)


  // AsyncStorage.clear()

  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <SafeAreaView

          style={{
            paddinTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
            backgroundColor: "white",

          }}
        >
          <StatusBar
            backgroundColor={"white"}
            barStyle={"dark-content"}
            translucent={false}
           
          />


{/* {
  console.log("verified",verified)
}
{
      verified ? <App></App> : <LoginScreen></LoginScreen>
    } */}
  

  <Stack.Navigator>
 
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
 
    <Stack.Screen
      name="App"
      component={APP}
      options={{ headerShown: false }}
      initialParams={{ mobile: mobile }}
    />

</Stack.Navigator>



        </SafeAreaView>
      </NavigationContainer>
    </NativeBaseProvider>


  

  )
}

export default App







