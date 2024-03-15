/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';


import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../Components/login/Login";
import BussinessProviderHome from './Owner/DataHome';
import SignIn from './login/SignIn';
import UsersHome from './Users/UsersHome';
import EStyleSheet from 'react-native-extended-stylesheet';
import { defaultNumbers } from '../Constants/AppConstants';

import { useAuth } from './AuthContext';
import CreateProfile from './Users/CreateProfile';

const Stack = createNativeStackNavigator(); //for stack Navigator


type SectionProps = PropsWithChildren<{
  title: string;
}>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

let { height, width: deviceWidth } = Dimensions.get('window');

EStyleSheet.build({
  // $rem: 16, // base font size
  $rem: getFontWidth(),
  // Add other global styles or variables here
});

function getFontWidth() {

  var minFontWidth = 14
  if (deviceWidth < 400) {
    minFontWidth = 12
  }

  return Math.floor(deviceWidth / 100) + minFontWidth;
}

function App(props: any) {

  const isDarkMode = useColorScheme() === 'dark';

  const userDetails_From_Auth = useAuth(); //to verify whether the user is loggedIn or not

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  console.log("isUserLoggedIn", userDetails_From_Auth?.phoneNumber,userDetails_From_Auth?.uid)

  // user Auth {"displayName": null, "email": null, "emailVerified": false, "isAnonymous": false,
  //  "metadata": {"creationTime": 1706806114065, "lastSignInTime": 1706807235262}, "multiFactor": {"enrolledFactors": [Array]}, "phoneNumber": "+917659913161", "photoURL": null, "providerData": [[Object]],
  //  "providerId": "firebase", "tenantId": null, "uid": "Ut2x3wOmhdQ0axVFLKfsX9sAdIt1"}

  return (
    <NavigationContainer>

      {userDetails_From_Auth === null ? <Stack.Navigator>

        {/* <Stack.Screen name="BussinessProviderHosme" component={BussinessProviderHome} options={{headerShown:false}}/> */}
         <Stack.Screen name="UsersHomeScreen" component={UsersHome} options={{headerShown:false}}/>
       {/* <Stack.Screen name="CreateProfile" component={CreateProfile} /> */}

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'LogIn', headerTitleAlign: "center", headerTintColor: 'red' }}
        />

        <Stack.Screen name="SignInScreen" component={SignIn} />

      </Stack.Navigator> :
        <Stack.Navigator>

          {defaultNumbers.includes(userDetails_From_Auth?.phoneNumber) && <Stack.Screen name="BussinessProviderHome" component={BussinessProviderHome} options={{headerShown:false}} />}
          {!defaultNumbers.includes(userDetails_From_Auth?.phoneNumber) && <Stack.Screen name="UsersHomeScreen" component={UsersHome} options={{headerShown:false}}/>}

          <Stack.Screen name="CreateProfile" component={CreateProfile} />

        </Stack.Navigator>
      }

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
