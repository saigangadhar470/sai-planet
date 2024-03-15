import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth"
import LoginStyles from "../../Styles/login";
import { Firestore } from "firebase/firestore";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../AuthContext";
import sharedStyles from "../../Styles/sharedStyle";


function UsersHome({ navigation }: any) {

    const [data, setData] = useState([])
    const userDetails_From_Auth = useAuth(); //to verify whether the user is loggedIn or not


    async function logOut() {

        try {
            await auth().signOut();
            navigation.navigate("Login")
        } catch (error) {
            console.error('Error logging out:', error);
        }

    }

    useEffect(() => {

        // navigation.setOptions({
        //     headerTitle: "View Plants",
        //     headerShown: true,
        //     headerTitleAlign: 'center',
        //     headerRight: () => (
        //         <View style={sharedStyles.subHeaderView}>
        //             <TouchableOpacity onPress={() => navigation.navigate("CreateProfile", { isProfileEdit: true, })}>
        //                 <Text style={sharedStyles.subheaderTitle}>Profile</Text>
        //             </TouchableOpacity>
        //         </View>
        //     ),
        // });

        const fetchData = async () => {

            const snapShot = await firestore().collection('bussiness_plants_doc').get()

            const data: any = snapShot.docs.map(doc => doc.data());

            setData(data)
        }
        fetchData()
    }, [])

    console.log("data", data[0])

    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "white" }}>
                    <Text></Text>
                    <Text style={[sharedStyles.headerText, {fontWeight:"bold",fontSize:20}]}>Plants</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("CreateProfile", { isProfileEdit: true, })}>
                        <Text style={[{ textDecorationLine: "underline", color: "#9739E4" }, sharedStyles.headerText]}>Profile</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={[{ flex: 10 }]} >
                    {data.map((item: any, index: number) => {
                        return <View key={index} style={sharedStyles.cardContainer}>
                            <Text style={{ color: "black" }}>Plant Name : {item.name}</Text>
                            <Text style={{ color: "black" }}>Plant Price : {item.price}</Text>
                            <Text style={{ color: "black" }}>Placement Type: {item.placement}</Text>
                        </View>

                    })
                    }

                </ScrollView>

                <TouchableOpacity style={{ margin: 15, marginTop: 15 }} onPress={() => logOut()}>
                    <Text style={{ padding: 10, backgroundColor: "red", textAlign: "center", color: "white", fontWeight: "bold", fontSize: 20 }}>Log out</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default UsersHome;