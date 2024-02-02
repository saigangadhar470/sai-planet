import React from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import LoginStyles from "../../Styles/login";

function Login({ navigation }: any) {
    const [phoneNumber, setPhoneNumber] = React.useState("");

    return (
        <View>
            <Text style={{color:'black'}}>Enter Your Phone Number</Text>

            <TextInput keyboardType="numeric" maxLength={10} style={[LoginStyles.textInput, { borderWidth: 5, borderColor: 'red', fontSize: 25,color:'black',marginBottom:20 }]} onChangeText={(e) => { setPhoneNumber(e) }}></TextInput>

            <Button title="Continue" disabled={phoneNumber.length === 10 ? false : true} onPress={() => navigation.navigate('SignInScreen', { mobileNumber: phoneNumber })} />

        </View>
    )
}

export default Login;




// import React, { useState, useEffect } from 'react';
// import { Button, Text, TextInput, View } from "react-native";
// import LoginStyles from "../../Styles/login";
// import auth from "@react-native-firebase/auth";


// function SignIn(props: any) {

//     const [otp, setOtp] = useState("")

//     const [confirm, setConfirm] = useState(null);

//     React.useEffect(() => {
//         // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//         // signInWithPhoneNumber()
//     }, [])


//     async function signInWithPhoneNumber() {
//         const confirmation: any = await auth().signInWithPhoneNumber(props.route.params.mobileNumber)
//         console.log("confirmation", confirmation)
//         setConfirm(confirmation); // type assertion here

//     }

//     async function validateOtp() {
//         try {
//             if (confirm !== null) {
//                 var firebaseAuthdata: any = confirm;
//                 await firebaseAuthdata.confirm(otp); // Confirming OTP here

//                 console.log("Sss")
//             } else {
//                 console.log("Confirmation object is null");
//                 // Handle the case when confirm is null, maybe show an error message
//             }
//         } catch (error) {
//             console.log("Invalid OTP", error);
//             // Handle the case when OTP verification fails
//         }
//     }


//     return (
//         <View>
//             <Text style={{ color: "blue" }}>Enter the otp sent to this Mobile Number {props.route.params.mobileNumber}</Text>

//             <TextInput keyboardType="numeric" value={otp} maxLength={10} style={[LoginStyles.textInput, { borderWidth: 5, borderColor: 'red', fontSize: 25 }]} onChangeText={(e) => { setOtp(e) }}></TextInput>

//             <Button title="Confirm Code" onPress={() => validateOtp()} />

//         </View>
//     )
// }

// //things to do after entering otp ,it should automatically validate with button click

// export default SignIn;