import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth"
import LoginStyles from "../../Styles/login";
import { Firestore } from "firebase/firestore";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../AuthContext";
import sharedStyles from "../../Styles/sharedStyle";


// import {appsss} from "../../Components/firebase"



function UsersHome({ navigation }: any) {

    const [data, setData] = useState([])
    const userDetails_From_Auth = useAuth(); //to verify whether the user is loggedIn or not


    async function logOut() {
        console.log("click me")

        try {
            await auth().signOut();
            navigation.navigate("Login")
        } catch (error) {
            console.error('Error logging out:', error);
        }

    }

    useEffect(() => {
        // const data = firestore().collection().get('bussiness_plants_doc')

        const fetchData = async () => {

            const snapShot = await firestore().collection('bussiness_plants_doc').get()

            const data: any = snapShot.docs.map(doc => doc.data());

            setData(data)
        }
        fetchData()
    }, [])

    console.log("data", data.length)

    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "black", padding: 15 }}>
                <Text></Text>
                <Text style={[sharedStyles.headerText, {}]}>Plants</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("CreateProfile",{isProfileEdit : true,userAuthId:"dRxbapejcRWw8UkhSczhebSy8lX2"})}>
                    <Text style={[{ textDecorationLine: "underline" }, sharedStyles.headerText]}>Profile</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={sharedStyles.cardContainer}>
                <View>
                    <Text style={{ color: 'red' }}> welcome userr</Text>
{/* 
                    <TouchableOpacity onPress={() => navigation.navigate("CreateProfile")}>
                        <Text style={{ color: 'red' }}> profile</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity onPress={() => logOut()}><Text style={LoginStyles.text}>log out</Text></TouchableOpacity>

                </View>
            </ScrollView>
        </>
    )
}

export default UsersHome;