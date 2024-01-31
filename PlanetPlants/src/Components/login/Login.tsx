import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import LoginStyles from "../../Styles/login";
// import 


// function Login(props:any){
//     return(
//         <View>
//             <Text>login new oneee</Text>

//             <TouchableOpacity onPress={()=>props.navigation.navigate('DataHomeScreen')}>
//                 <Text> click Meee</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

function Login({navigation}:any){
    return(
        <View>
            <Text>Enter Your Phone Number</Text>

            <TextInput style={[LoginStyles.textInput,{}]} onChangeText={()=>{}}></TextInput>

            <TouchableOpacity onPress={()=>navigation.navigate('DataHomeScreen')}>
                <Text> click Meee</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;