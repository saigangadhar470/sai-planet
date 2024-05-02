import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import sharedStyles from "../../Styles/sharedStyle";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../AuthContext";
import { launchImageLibrary } from "react-native-image-picker";
import { storage } from "../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";


function CreateProfile(props: any) {

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [selectedImageList, setSelectedImage] = useState<any>([]);
    const [media, setMedia] = useState(null)

    const userDetails_From_Auth = useAuth(); //to verify whether the user is loggedIn or not

    useEffect(() => {

        const fetchData = async () => {

            // For edit profile
            if (props.route.params?.isProfileEdit) {
                setLoading(true)

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
                    setMedia(data?.image);
                    setLoading(false);

                }
            }
        };

        fetchData(); // Call the async function immediately

    }, [])

    const submit = async () => {

        setLoading(true)

        let recentMedia;
        if (selectedImageList.length > 0) {
            recentMedia = await uploadImage()
        }

        try {

            //set will update doc if already some data is existed with that id or else create new doc,where as add will keep creating new one by generating random id
            const collectionRef = firestore().collection('customerDetails_Doc');

            // const userId = props.route.params.userAuthId;
            const userId = userDetails_From_Auth.uid;

            await collectionRef.doc(userId).set({
                name: name,
                email: email,
                address,
                userId: userId,
                image: selectedImageList.length > 0 ? recentMedia : media,
                phoneNumber:userDetails_From_Auth.phoneNumber
            })

            if (props.route.params?.isProfileEdit) {
                props.navigation.goBack()
            } else {
                props.navigation.navigate("UsersHomeScreen")

            }
        } catch (error) {
            console.log("error", error)
        }

    }


    const openImagePicker = () => {

        const options: any = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            multiple: true,
        };

        launchImageLibrary(options, async (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                setSelectedImage(response.assets);
            }
        });

    }

    async function uploadImage() {
        try {
            //before adding new profile pic we are deleting old one
            if (media !== null && media !== undefined) {
                const mediaObj: any = media
                const fileRef = ref(storage, mediaObj?.storageRef);

                await deleteObject(fileRef);
            }

            const uri: any = selectedImageList[0].uri
            const fileType = selectedImageList[0].type
            const response = await fetch(uri);
            const blob = await response.blob();

            // Save the record to Firestore storage
            const storageRef = ref(storage, "ProfilePics/" + new Date().getTime());

            // Upload the file
            const snapshot = await uploadBytes(storageRef, blob);

            // Get the download URL
            const downloadURL = await getDownloadURL(snapshot.ref);

            const mediaObj = {
                url: downloadURL,
                storageRef: snapshot.ref.fullPath,
                fileType: fileType
            }

            return mediaObj;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    function removeImage(image: any) {

        setSelectedImage([])
    }

    function profilePic() {
        if (selectedImageList.length === 0 && (media === null || media === undefined)) {
            return <Icon name="file-image-plus" size={60} color="grey" />
        }

        if (selectedImageList.length !== 0) {
            const imageObj: any = [...selectedImageList]
            return <Image source={{ uri: imageObj[0].uri }} style={sharedStyles.profilePic} />

        } else {
            const image: any = media
            return <Image source={{ uri: image?.url }} style={sharedStyles.profilePic} />
        }
    }

    console.log("user",userDetails_From_Auth.phoneNumber)
    return (
        <View style={{ flex: 1 }}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={sharedStyles.cardContainer}>

                    <TouchableOpacity onPress={() => { openImagePicker() }} style={sharedStyles.profilePicContainer}>
                        {profilePic()}
                    </TouchableOpacity>
                    <Text style={sharedStyles.textLabel}>Name</Text>
                    <TextInput
                        onChangeText={x => setName(x)}
                        value={name}
                        style={sharedStyles.textInputView}
                        placeholder={"Enter Name"}
                        placeholderTextColor={"grey"}
                        autoFocus={props.route.params?.isProfileEdit ? false : true}
                        textAlignVertical="top"
                        maxLength={5000}
                        multiline={true}
                    />
                    <Text style={sharedStyles.textLabel}>Email</Text>
                    <TextInput
                        onChangeText={x => setEmail(x)}
                        value={email}
                        style={sharedStyles.textInputView}
                        placeholder={"Enter Email"}
                        placeholderTextColor={"grey"}
                        textAlignVertical="top"
                        maxLength={5000}
                        multiline={true}
                    />
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

export default CreateProfile;
