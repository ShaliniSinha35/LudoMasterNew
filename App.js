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


//   const getNumber = async () => {
//     try {
//         let number = await AsyncStorage.getItem('user');
//         console.log("User ID:", number);
       
    
//         if (!number) {
//             console.log("User ID not found in AsyncStorage");
//             return; // or handle this case as appropriate
//         }
        
//         // Convert number to string before sending the request
//         const userId = parseInt(number.replace(/\D/g, ''), 10);


//         const res = await axios.get(`https://ludo-b2qo.onrender.com/verify?userId=${userId}`);
//         const data = res.data;

//         console.log("Response from server:", data);
     
    
//         if (data && data.length > 0) {
//             setVerified(true);

//             console.log("41",data[0].mobile)
          
//             setMobile(parseInt(data[0].mobile))
       
//         } else {
//             setVerified(false);
//         }
//     } catch (error) {
//         console.log("43 Error fetching data:", error);
//         // Handle errors here, e.g., show an error message to the user
//     }
//   };


// useEffect(() => {
//     getNumber()
// },[])



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







