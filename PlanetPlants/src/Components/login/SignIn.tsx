import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginStyles from '../../Styles/login';
import { defaultNumbers } from '../../Constants/AppConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import sharedStyles from '../../Styles/sharedStyle';

function SignIn(props: any) {
  const [authOtpData, setAuthOtpData] = useState(null);
  const [enterOtpCode, setEnterOtpCode] = useState('');
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);

  useEffect(() => {

    fetchData();
  }, [props.route.params.mobileNumber]);

  const fetchData = async () => {
    try {
      const phoneNumber = `+91${props.route.params.mobileNumber}`;
      console.log("check", phoneNumber)
      const confirmationData: any = await auth().signInWithPhoneNumber(phoneNumber);
      console.log("confirmationData", confirmationData)
      setAuthOtpData(confirmationData);
      console.log("letsCheck after authentication", authOtpData);
    } catch (error) {
      console.error('Error fetching OTP:', error);
    }
  };

  async function verifyOtp() {
    console.log("sample isOtpValid", "doneee");

    if (authOtpData !== null) {
      const authenticationFirebaseData: any = authOtpData;

      try {
        const loggedInUserDetails = await authenticationFirebaseData.confirm(enterOtpCode);

        console.log("isOtpValid", loggedInUserDetails, loggedInUserDetails.user.phoneNumber);

        if (loggedInUserDetails) {

          var userAuthId = loggedInUserDetails.user.uid;
          console.log("loggedInUserDetails.user.uid", loggedInUserDetails.user.uid)
          // Configure persistence after successful OTP verification
          handleLoginSuccess(userAuthId)
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);

        setIsOtpInvalid(true)

      }
    } else {
      console.log("elseee", authOtpData);
      setIsOtpInvalid(true)
    }
  }

  const handleLoginSuccess = (userAuthId: any) => {
    const phoneNumber = `+91${props.route.params.mobileNumber}`;
    if (defaultNumbers.includes(phoneNumber)) {
      props.navigation.navigate('BussinessProviderHome');
    } else {
      navigateReqScreen(userAuthId)
    }
  };

  async function navigateReqScreen(userAuthId: any) {
    try {
      const collectionRef = firestore().collection('customerDetails_Doc');
      const docId = userAuthId
      const docRef = collectionRef.doc(docId);

      // Get the document
      const doc = await docRef.get();

      console.log("doc", doc.data())

      if (doc.exists) {
        props.navigation.navigate('UsersHomeScreen');

      } else {
        props.navigation.navigate("CreateProfile",{isProfileEdit:false})
      }

    } catch (error) {
      console.log("error ", error)
    }
  }

  return (

    <View style={[sharedStyles.cardContainer,{paddingBottom:50}]}>
      
      <Text style={{ color: "blue",paddingBottom:15,paddingTop:5 }}>Enter the otp sent to this Mobile Number {props.route.params.mobileNumber} :</Text>
      <TextInput value={enterOtpCode} keyboardType="numeric" maxLength={6} style={[LoginStyles.textInput, { borderBottomWidth: 5, borderColor: 'red', fontSize: 25, marginBottom: 20, color: 'black',paddingLeft:15,alignSelf:"center",paddingRight:15 }]} onChangeText={(e) => { setEnterOtpCode(e) }} />
      <Button title="Confirm Code" disabled={enterOtpCode.length === 6 ? false : true} onPress={() => verifyOtp()} />
      {isOtpInvalid && <TouchableOpacity onPress={() => { fetchData() }}><Text style={{ color: 'red', alignSelf: "flex-end",marginTop:10 }}>Resend Otp</Text></TouchableOpacity>}
    </View>
  );
}

export default SignIn;







