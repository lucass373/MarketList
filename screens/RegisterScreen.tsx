import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, TextInput} from 'react-native';
import { RootTabScreenProps } from '../types';
import { getDatabase, set, ref, remove, off, push } from 'firebase/database';
import { db } from '../firebase/firebase';

export default function RegisterScreen({ navigation }: RootTabScreenProps<'RegisterScreen'>) {
  
  const [text, setText] = React.useState('')

  const onPress = () => {
  const usrListRef = ref(db, 'users/' + 'usuarios')
  set(ref(db, 'users/' + text), {
   username : text,
  });
  setText('')
  navigation.navigate('LoginScreen')

}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>nome</Text>
      
      <TextInput 
        placeholder='usuário'
        style={styles.input}
        onChangeText={(value) => setText(value)}
        value = {text}>
      </TextInput>

      <View style={styles.separator}/>

        <TouchableOpacity
          onPress={onPress}
          style={styles.button}><Text>Registrar</Text>
        </TouchableOpacity>
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
