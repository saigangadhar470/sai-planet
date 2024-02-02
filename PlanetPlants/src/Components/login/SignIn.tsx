
// import React, { useState, useEffect } from 'react';
// import { Button, Text, TextInput, View } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import LoginStyles from '../../Styles/login';

// function SignIn(props: any) {
//   const [authOtpData, setAuthOtpData] = useState(null);

//   // verification code (OTP - One-Time-Passcode)
//   const [enterOtpCode, setEnterOtpCode] = useState(''); 

//   useEffect(() => {
//     console.log("phoneNumber Mount")

//     fetchOtp()
//     console.log("letsCheck", authOtpData)

//   }, []);

//   const fetchOtp: any = async () => {

//     console.log("letsCheck11111111111111111", authOtpData)
//     const phoneNumber = `+91 ${props.route.params.mobileNumber}`

//     const confirmationData: any = await auth().signInWithPhoneNumber(phoneNumber)
//     setAuthOtpData(confirmationData)
//     console.log("letsCheck22222222222222222", authOtpData)
//   }


//   async function verifyOtp() {
//     console.log("sample isOtpValid", "doneee")

//     if (authOtpData !== null) {

//       const authenticationFirebaseData: any = authOtpData

//       const isOtpValid = await authenticationFirebaseData.confirm(enterOtpCode)

//       console.log("isOtpValid", isOtpValid)

//     }
//   }
//   // console.log("here is otp", enterOtpCode)
//   // console.log("letsChecknnnnnnn", authOtpData)

//   return (
//     <>
//       <TextInput value={enterOtpCode} keyboardType="numeric" maxLength={6} style={[LoginStyles.textInput, { borderWidth: 5, borderColor: 'red', fontSize: 25, marginBottom: 20 }]} onChangeText={(e) => { setEnterOtpCode(e) }} />

//       <Button title="Confirm Code" disabled={enterOtpCode.length === 6 ? false : true} onPress={() => verifyOtp()} />
//     </>
//   );
// }

// export default SignIn

import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginStyles from '../../Styles/login';
import { defaultNumbers } from '../../Constants/AppConstants';

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
        const isOtpValid = await authenticationFirebaseData.confirm(enterOtpCode);

        console.log("isOtpValid", isOtpValid, isOtpValid.user.phoneNumber);

        if (isOtpValid) {
          // Configure persistence after successful OTP verification

          handleLoginSuccess()
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



  const handleLoginSuccess = () => {
    const phoneNumber = `+91${props.route.params.mobileNumber}`;
    if (defaultNumbers.includes(phoneNumber)) {
      props.navigation.navigate('BussinessProviderHome');
    } else {
      props.navigation.navigate('UsersHomeScreen');
    }
  };

  return (
    <>
      <Text style={{ color: "blue" }}>Enter the otp sent to this Mobile Number {props.route.params.mobileNumber}</Text>
      <TextInput value={enterOtpCode} keyboardType="numeric" maxLength={6} style={[LoginStyles.textInput, { borderWidth: 5, borderColor: 'red', fontSize: 25, marginBottom: 20, color: 'black' }]} onChangeText={(e) => { setEnterOtpCode(e) }} />
      <Button title="Confirm Code" disabled={enterOtpCode.length === 6 ? false : true} onPress={() => verifyOtp()} />
      {isOtpInvalid && <TouchableOpacity onPress={() => { fetchData() }}><Text style={{ color: 'red', alignSelf: "flex-end" }}>Resend Otp</Text></TouchableOpacity>}
    </>
  );
}

export default SignIn;







