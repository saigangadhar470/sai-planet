import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, ScrollView, Text, TextInput, View } from "react-native";
import sharedStyles, { sharedColorConstants } from "../../Styles/sharedStyle";

import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../AuthContext";


function CreateProfile(props: any) {

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")

    const userDetails_From_Auth = useAuth(); //to verify whether the user is loggedIn or not

    useEffect(() => {

        const fetchData = async () => {
            if (props.route.params.isProfileEdit) {
                const collectionRef = firestore().collection('customerDetails_Doc');
                const docId = userDetails_From_Auth?.uid
                // const docId = "dRxbapejcRWw8UkhSczhebSy8lX2";
                const docRef = collectionRef.doc(docId);

                // Get the document
                const doc = await docRef.get();
                if (doc.exists) {
                    const data: any = doc.data()
                    setName(data.name);
                    setAddress(data.address);
                    setEmail(data.email);
                }
            }
        };

        fetchData(); // Call the async function immediately

    }, [])

    const submit = async () => {

        try {

            setLoading(true)

            //set will update doc if already some data is existed with that id or else create new doc,where as add will keep creating new one by generating random id
            const collectionRef = firestore().collection('customerDetails_Doc');

            // const userId = props.route.params.userAuthId;
            const userId = userDetails_From_Auth.uid;

            await collectionRef.doc(userId).set({
                name: name,
                email: email,
                address,
                userId: userId
            })

            if (props.route.params.isProfileEdit) {
                props.navigation.goBack()
            } else {
                props.navigation.navigate("UsersHomeScreen")

            }
        } catch (error) {
            console.log("error", error)
        }

    }

    return (
        <View style={{ flex: 1 }}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={sharedStyles.cardContainer}>

                    <Text style={sharedStyles.textLabel}>Name</Text>
                    <TextInput
                        onChangeText={x => setName(x)}
                        value={name}
                        style={sharedStyles.textInputView}
                        placeholder={"Enter Name"}
                        placeholderTextColor={"grey"}
                        autoFocus={props.route.params.isProfileEdit ? false : true}
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
                        textAlignVertical="top"
                        maxLength={5000}
                        multiline={true} />

                    <Text style={sharedStyles.textLabel}>Address</Text>
                    <TextInput
                        onChangeText={x => setAddress(x)}
                        value={address}
                        style={[sharedStyles.textInputView, { marginBottom: 20 }]}
                        placeholder={"Enter Address"}
                        placeholderTextColor={"grey"}
                        textAlignVertical="top"
                        maxLength={5000}
                        multiline={true}
                    />

                    <Button title="Submit" onPress={() => submit()} />

                </View>
            </ScrollView>

            {loading && <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>}
        </View>
    )

}

export default CreateProfile