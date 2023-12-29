import auth from '@react-native-firebase/auth';

import React, { useState } from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert} from "react-native"
import { TextInput } from "react-native";


const FirebaseSignUp =()=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const handleLogin=()=>{
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
            Alert.alert("User Account is created successfully")
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        });
    }

    return(
        <View style={myStyle.mainView}>
            <Text style={myStyle.headingText}>Sign Up</Text>

            <TextInput style={myStyle.textInput} placeholder="Full Name" value={name} onChangeText={(text)=>{setName(text)}}/>
            <TextInput style={myStyle.textInput} placeholder="Email Address" value={email} onChangeText={(text)=>{setEmail(text)}}/>
            <TextInput style={myStyle.textInput} secureTextEntry={true} placeholder="Password" value={password} onChangeText={(text)=>{setPassword(text)}}/>

            <TouchableOpacity style={myStyle.loginButton} onPress={()=>{handleLogin()}} >
                <Text style={{color:"white"}}>Create Account</Text>
            </TouchableOpacity>

            <Text onPress={()=>{NavigationContainer.navigate('FirebaseLogin')}} style={{color:"blue", fontSize:15}}>Already have an Account? Login</Text>

        </View>
    )
}

const myStyle = StyleSheet.create({
    mainView:{
        flex:1,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"
    },
    headingText:{
        fontSize:25,
        textAlign:"center",
        paddingBottom:15
    },
    textInput:{
        width:"80%",
        backgroundColor:"lightgrey",
        padding:10,
        marginVertical:20,
        borderRadius:10
        
    },
    loginButton:{
        backgroundColor:"black",
        width:280,
        height:45,
        borderRadius:10,
        marginVertical:20,
        alignItems:"center",
        justifyContent:"center"

    }
})

export default FirebaseSignUp;