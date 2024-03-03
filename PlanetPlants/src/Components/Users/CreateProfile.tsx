import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
import sharedStyles, { sharedColorConstants } from "../../Styles/sharedStyle";

import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../AuthContext";


function CreateProfile(props: any) {

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")

    const userDetails_From_Auth = useAuth(); //to verify whether the user is loggedIn or not

    useEffect(()=>{
        
        const fetchData = async () => {
            if (props.route.params.isProfileEdit) {
                const collectionRef = firestore().collection('customerDetails_Doc');
                const docId = props.route.params.userAuthId
                // const docId = "dRxbapejcRWw8UkhSczhebSy8lX2";
                const docRef = collectionRef.doc(docId);
          
                // Get the document
                const doc = await docRef.get();
                 if(doc.exists){
                   const data:any = doc.data()
                    setName(data.name);
                    setAddress(data.address);
                    setEmail(data.email);
                 }
                console.log("doc",doc.data())
                // Now you can do something with the doc
            }
        };
    
        fetchData(); // Call the async function immediately

    },[])

console.log("user props",props.route.params.isProfileEdit)
    const submit = async () => {

        try {
            //set will update if already some data is existed with that id,where as add will keep creating new one by generating random id
            const collectionRef = firestore().collection('customerDetails_Doc');

            const userId = props.route.params.userAuthId;
            // const userId = userDetails_From_Auth.uid;

            await collectionRef.doc(userId).set({
                    name:name,
                    email:email,
                    address,
                    userId:userId

                    // userId:userDetails_From_Auth.uid
                }
            )

            console.log("customerDetails_Doc uploaded")
            if (props.route.params.isProfileEdit) {
                props.navigation.goBack()
            }else{
                props.navigation.navigate("UsersHomeScreen")

            }
        }catch(error){
            console.log("error",error)
        }

    }

    useEffect(()=>{
        
        const fetchData = async () => {
            if (props.route.params.isProfileEdit) {
                const collectionRef = firestore().collection('customerDetails_Doc');
                // const docId = props.route.params.userAuthId
                const docId = "dRxbapejcRWw8UkhSczhebSy8lX2";
                const docRef = collectionRef.doc(docId);
          
                // Get the document
                const doc = await docRef.get();

                console.log("doc",doc.data())
                // Now you can do something with the doc
            }
        };
    
        fetchData(); // Call the async function immediately

    },[])

    return (
        <View>

            {/* <Text>profile</Text>

            <Text></Text> */}

            {/* <View style={addExpensesStyle.container}> */}

            {/* enter the details of vendor expenses  ( after entering the details of the vendor expenses those expenses will be saved and displayed in expenses screen) */}

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={sharedStyles.cardContainer}>


                    <Text style={sharedStyles.textLabel}>Name</Text>

                    <TextInput
                        onChangeText={x => setName(x)}
                        value={name}
                        style={sharedStyles.textInputView}
                        placeholder={"Enter Name"}
                        placeholderTextColor={"grey"}
                        autoFocus={true}
                        textAlignVertical="top"
                        maxLength={5000}
                        multiline={true} />


                    <Text style={sharedStyles.textLabel}>Email</Text>

                    <TextInput
                        onChangeText={x => setEmail(x)}
                        value={email}
                        style={sharedStyles.textInputView}
                        placeholder={"Enter Email"}
                        placeholderTextColor={"grey"}
                        autoFocus={true}
                        textAlignVertical="top"
                        maxLength={5000}
                        multiline={true} />


                    <Text style={sharedStyles.textLabel}>Address</Text>

                    <TextInput
                        onChangeText={x => setAddress(x)}
                        value={address}
                        style={[sharedStyles.textInputView,{marginBottom:20}]}
                        placeholder={"Enter Address"}
                        placeholderTextColor={"grey"}
                        autoFocus={true}
                        textAlignVertical="top"
                        maxLength={5000}
                        multiline={true} />

                    <Button title="Submit" onPress={() => submit()} />


                </View>
            </ScrollView>
        </View>
    )

}

export default CreateProfile