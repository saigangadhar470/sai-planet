import React, { useState } from "react";
import { Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import LoginStyles from "../../Styles/login";


function Login({ navigation }: any) {

  const [phoneNumber, setPhoneNumber] = React.useState("");

  return (

    <View style={LoginStyles.container}>

      <Text style={[LoginStyles.loginText, LoginStyles.bottomGap]}>Enter your phone number :</Text>

      <TextInput autoFocus keyboardType="numeric" maxLength={10} style={[LoginStyles.textInputView, LoginStyles.bottomGap]} onChangeText={(e) => { setPhoneNumber(e) }}></TextInput>

      <View style={LoginStyles.topGap}>
        <Button title="Continue" disabled={phoneNumber.length === 10 ? false : true} onPress={() => navigation.navigate('SignInScreen', { mobileNumber: phoneNumber })} />
      </View>


    </View>
  )
}

export default Login;



//  image picker

