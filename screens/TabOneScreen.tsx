import { child, Database, get, getDatabase, limitToFirst, onValue, ref, update,} from 'firebase/database';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { db } from '../firebase/firebase';
import Navigation from '../navigation';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({navigation,route}: RootTabScreenProps<'TabOne'>) {

  
  const {text} : any  = route.params;
  
  return (
   <View style={styles.container}>
     <View style={{backgroundColor:'gray', width:50, height: 50 , borderRadius: 30}}>

     </View>
     <Text style={styles.title}>Olá, {text}</Text>
   </View>
  );
}
const styles = StyleSheet.create({
    container: {
    //flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
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
});
