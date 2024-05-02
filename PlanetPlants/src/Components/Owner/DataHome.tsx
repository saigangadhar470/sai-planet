import React, { useState } from "react";
import { Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
import LoginStyles from "../../Styles/login";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';

import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAuth } from "../AuthContext";
import sharedStyles from "../../Styles/sharedStyle";
import { ActivityIndicator } from 'react-native';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export interface PlantData {
    name: string,
    price: string,
    images: Array<any>,
    place: string, //indoor or outdoor or both
}

function BussinessProviderHome(navigation: any) {

    const placementTypes: any = ["Indoor Plants", "Outdoor Plants", "Both"]
    const userDetails_From_Auth = useAuth(); //to access logged in user details

    //setting initial state
    const [loading, setLoading] = useState(false);
    const [selectedImageList, setSelectedImage] = useState([]);
    const [price, setPrice] = useState("")
    const [name, setName] = useState("")
    const [placement, setPlacement] = useState<any>("Indoor Plants")
    const [isDropdownselected, setIsDropdownSelected] = useState(false);

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
                // to upload image see the next function
                // await uploadImage(response.assets[0].uri, "image/jpeg");

                // console.log("response", response.assets[0].uri)

                            let imageUri = response.uri || response.assets?.[0]?.uri;
            
                            // const newSelectedImageList: any = selectedImageList.concat(...response.assets)
                            const newSelectedImageList:any = [...response.assets,...selectedImageList]
                            setSelectedImage(newSelectedImageList);
            
                            // setPlantData((prevState: any) => {
                            //     return {
                            //         ...prevState,
                            //         images: newSelectedImageList
                            //     }
                            // })

                console.log("response", response)
            }
        });

    }

    async function uploadImage(uri: any, fileType: any) {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            // Save the record to Firestore storage
            const storageRef = ref(storage, "Stuff/" + new Date().getTime());
    
            // Upload the file
            const snapshot = await uploadBytes(storageRef, blob);
    
            // Get the download URL
            const downloadURL = await getDownloadURL(snapshot.ref);

            const mediaObj = {
                url: downloadURL,
                fileType:fileType,
                storageRef: snapshot.ref.fullPath,
            }
            
            return mediaObj;

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    function removeImage(image: any) {

        const selectedImages = selectedImageList.filter((x: any) => x.uri !== image.uri)
        setSelectedImage([...selectedImages])
    }

    async function logOut() {

        try {
            await auth().signOut();
            navigation.navigate("Login")
        } catch (error) {
            console.error('Error logging out:', error);
        }

    }

    const sendDataToFirestore = async () => {

        setLoading(true);
        const medias = await uploadSelectedImages()

        try {
      
            const collectionRef = firestore().collection('bussiness_plants_doc');
            // {   //it is needed when i have custom document id else the firestore will create random guid
            //     const docRef = collectionRef.doc('custom_document_id'); // Replace with your desired custom document ID
            // }
            // Add a new document with the data
            // await docRef.set({

            await collectionRef.add({
                name: name,
                price: price,
                placement: placement,
                imagesList: medias,
                createdBy: userDetails_From_Auth?.uid
            });

            setPlacement("Indoor Plants")
            setPrice("")
            setSelectedImage([])
            setName("")
            setLoading(false)

        } catch (error) {
            console.error('Error sending data to Firestore:', error);
        }
    };

    function uploadSelectedImages(){
      const uploadPromises =  selectedImageList.map((item: any) => {
          return uploadImage(item.uri, item.type);
       })

       return Promise.all(uploadPromises)
    }


    function handleDropdown() {
        setIsDropdownSelected(prev => !prev)
    }

    return (
        <View style={{ flex: 1 }}>
            {/* <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 10 }}> */}
            <View style={{flex:10}}>
                <View style={[sharedStyles.cardContainer, { marginTop: 30 }]}>

                    <Text style={{ color: 'black', textAlign: "center", fontWeight: "bold", fontSize: 23 }}>This iZ Bussiness</Text>

                    <Text style={sharedStyles.textLabel}>Plant Name :</Text>
                    <TextInput value={name} style={[LoginStyles.textInputView, LoginStyles.bottomGap]} onChangeText={(e) => setName(e)}></TextInput>

                    <Text style={sharedStyles.textLabel}>Plant Price :</Text>
                    <TextInput value={price} style={[LoginStyles.textInputView, LoginStyles.bottomGap]} keyboardType="numeric" maxLength={4} onChangeText={(e) => setPrice(e)}></TextInput>

                    <TouchableOpacity onPress={() => handleDropdown()}>
                        <Text>Select Plant Type: {placement}</Text>
                    </TouchableOpacity>

                    <Modal
                        visible={isDropdownselected}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={handleDropdown}
                    >
                        <TouchableOpacity
                            style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', }}
                            onPress={handleDropdown} // Handle closing the modal when clicked outside
                        >
                            <View style={{ backgroundColor: 'red', margin: 5, top: '30%', alignContent: 'center', justifyContent: 'center', }}>

                                {placementTypes.map((x: any,index:number) => {
                                    return <TouchableOpacity key={index} style={{ padding: 5, paddingLeft: 15 }} onPress={() => { setPlacement(x), handleDropdown() }}>
                                        <Text>{x}</Text>
                                    </TouchableOpacity>
                                })
                                }
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    <Text style={[sharedStyles.textLabel, { marginBottom: 15 }]}>Selected value: {placement}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>

                    {selectedImageList.map((image: any, index: number) => {
                        return <View key={index} style={{paddingLeft:10}}>
                            <TouchableOpacity onPress={() => { removeImage(image) }} ><Text style={{color:"red",alignSelf:"flex-end",fontWeight:"bold",fontSize:15}}>x </Text></TouchableOpacity>
                            <Image key={index} source={{ uri: image.uri }} style={{ width: 200, height: 200, marginBottom: 40 }} />
                        </View>
                    })}
</ScrollView>
                    <Button title="Pick Image" onPress={() => openImagePicker()} />

                    <View style={{ marginTop: 10 }}>
                        <Button title={"Send Data"} disabled={loading} onPress={() => sendDataToFirestore()} />
                    </View>

                </View>
                </View>
            {/* </ScrollView> */}

            <TouchableOpacity style={{ margin: 15, marginTop: 25 }} onPress={() => logOut()}>
                <Text style={{ padding: 10, backgroundColor: "red", textAlign: "center", color: "white", fontWeight: "bold", fontSize: 20 }}>Log out</Text>
            </TouchableOpacity>

            {loading && <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>}
        </View>
    )
}

export default BussinessProviderHome;


// const onChangeTextInput = (value: string, fieldName: string) => {

//     setPlantData((prevState: any) => {
//         return {
//             ...prevState,
//             [fieldName]: prevState[fieldName] + (value)
//         }
//     })
// }

// const onChangeTextInput = (value: string, fieldName: any) => {
//     setPlantData((prevState: any) => {
//         const updatedState = {
//             ...prevState,
//             [fieldName]: prevState[fieldName] + (value)
//         };
//         console.log('statePlantData', updatedState);
//         return updatedState;
//     });
// }


{/* {selectedImage.map((image: any, index: number) => (
                <Image key={index} source={{ uri: image.uri }} style={{ width: 200, height: 200, marginBottom: 10 }} />
                 ))}  
                */}


