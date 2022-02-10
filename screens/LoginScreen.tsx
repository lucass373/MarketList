import React, { Component, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, TextInput} from 'react-native';
import { RootTabScreenProps } from '../types';
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import { initFire } from '../firebase/firebase';
export default function LoginScreen({ navigation }: RootTabScreenProps<'LoginScreen'>) {
  
  
  const [text, setText] = useState('')
  
const onPress = () => {
const dbRef = ref(getDatabase(initFire))
get(child(dbRef, `users/${text}`)).then((snapshot) => {
  if (snapshot.exists()) {
    navigation.navigate('Bottom', {
    text,
    });
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
setText('')
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>usuário</Text>
     
      <TextInput      
      placeholder='usuário'
      style={styles.input}
      onChangeText={(name) => setText(name)}
      value= {text}
      ></TextInput>

      <View style={styles.separator}/>

      <TouchableOpacity
      onPress={onPress}
      style={styles.button}><Text>Login</Text></TouchableOpacity>

      <View style={styles.separator}/>

      <TouchableOpacity
      onPress={()=> navigation.navigate('RegisterScreen')}
      style={styles.button}><Text>Registrar</Text></TouchableOpacity>

      <View style={styles.separator}/>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input:{
      textAlign: 'center',
      backgroundColor: 'white',
      width: 160,
      borderRadius: 50,
  },
  button:{
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 160,
    borderRadius: 50,
  }
});