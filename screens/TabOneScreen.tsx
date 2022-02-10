import { child, Database, get, getDatabase, limitToFirst, onValue, ref, update,} from 'firebase/database';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { initFire } from '../firebase/firebase';
import Navigation from '../navigation';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({navigation,route}: RootTabScreenProps<'TabOne'>) {

  
  const {text} = route.params;
  
  return (
   <View style={styles.container}>
     <Text style={styles.title}>{text}</Text>
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
