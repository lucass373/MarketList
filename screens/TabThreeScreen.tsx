import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native'
import { Colors, FAB } from 'react-native-paper';
import useColorScheme from '../hooks/useColorScheme';
import { TextInput } from 'react-native-paper';
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { initFire } from '../firebase/firebase';
import { Item, VirtualHeader } from 'ionic-angular';
import { NavigationHelpersContext } from '@react-navigation/native';
import Navigation from '../navigation';


export default function TabThreeScreen({navigation, route}){

const [List , setList] = useState('')
const [Preco, setPreco] = useState('')
const [itemsArray, setItemsArray] = React.useState([]);
const db = getDatabase();
const postItemRef = ref(db,'Market List');
const newItemRef = push(postItemRef);

const onPress= () => {
  set(newItemRef, {
      Item : List,
      Preco : Preco
  });}

React.useEffect(()=>{
  onValue(postItemRef, (snapshot) => {
    
      let data = snapshot.val();
      const items = Object.values(data);
      setItemsArray(items);
    });
  },[]);

  function ItemComponent ({items}) {
    return (
      <View style={styles.container}>
        {items.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.title}>{item.Item}|{item.Preco}</Text>
            </View>
          );
        })}
      </View>
    );
 }

    return(
      
        <View style={styles.container}>
        <View style={styles.inpCont}>
          <TextInput
          label="Item"
          style={styles.Input1}
          mode = 'outlined'
          placeholder='Ex. "Arroz"'
          onChangeText={(List)=> setList(List)}
          value={List}
          />
          <TextInput
          label="Price"
          style={styles.Input2}
          mode = 'outlined'
          placeholder='Ex. 5.00'
          onChangeText={(Preco)=> setPreco(Preco)}
          value={Preco}
          />
        </View>


          <View style={styles.line}></View>


          <Text style={styles.title }>List</Text>
          <View style={styles.inpCont}>
      {itemsArray.length > 0 ? (
        <ItemComponent items={itemsArray} />
      ) : (
        <Text>No items</Text>
)}
    </View>
              <FAB            
                style={styles.fab}
                 medium
                 icon="pencil"
                  onPress={onPress}
  />
  
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection :'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#612F74',
      marginLeft: '50%',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    fab:{
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      color: 'blue',
      backgroundColor:'#612F74',
    },
    Input1:{
      width: '59%',
      marginLeft: 2, 
  },
  Input2:{
    width: '39%',
    marginRight: 2,
  },
  line:{
   marginTop: 10,
   width: '100%',
   height: 3,
   backgroundColor: '#612F74'
  },
  inpCont:{
    width: '100%',
    flexWrap: 'wrap',
    flexDirection:'row',
    justifyContent: 'space-between',
  }
  }
  );
  