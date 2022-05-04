import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import { FAB } from 'react-native-paper'
import { TextInput } from 'react-native-paper'
import {
  ref,
  push,
  set,
  onValue,
  child,
  update,
  remove,
} from 'firebase/database'
import { CheckBox } from 'react-native-elements'
import { db } from '../firebase/firebase'
import { Entypo } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList, RootTabScreenProps } from '../types'
import { NavigationContainer } from '@react-navigation/native'





export default function LimpList({navigation}){
    const [List, setList] = useState('')
    const [Quant, setQuant] = useState('')
    const [items, setItems] = React.useState([])
    //read
    useEffect(() => {
      onValue(ref(db, 'Market List/Limpeza'), (snapshot) => {
        setItems([])
        const data = snapshot.val()
        if (data !== null) {
          Object.values(data).map((items) => {
            setItems((oldArray) => [...oldArray, items])
          })
        }
      })
    }, [])
    //write
    const onPress = () => {
      const newPostKey = push(child(ref(db), 'Market List/Limpeza')).key
      set(ref(db, `Market List/Limpeza/${newPostKey}`), {
        item: List,
        quantidade: Quant,
        checked: false,
        uuid: newPostKey,
      })
      setList('')
      setQuant('')
    }
    //update
  
    const changeCheck = (id: string, checked: boolean) => {
      update(ref(db, 'Market List/Limpeza/' + id), {
        checked: checked,
        uuid: id,
      })
      setList('')
      setQuant('')
    }
    const remover = (id: string) => {
      remove(ref(db, 'Market List/Limpeza/' + id))
    }
    /*Funções antigas
  const onPress= () => {
    set(newItemRef, {
        Item : List,
        Preco : Preco,
        checked : false,
    });}
  const edit = (items) =>{
     setChecked(!items)
     const updates = {};
     updates[`/Market List/${postKey}/checked`] = checked;
     return update(ref(db),updates);
  }
  */
    /*useEffect(()=>{
    onValue(ref(db, 'Market List/' + uuid), (snapshot) => {
        let data = snapshot.val();
        const items = Object.values(data);
        setItemsArray(items);
      });
    },[]);*/
  
    function ItemComponent({ items }) {
      return (
        <View style={styles.container}>
          {items.map((items: any, index: string) => {
            return (
              <View key={index} style={styles.item}>
                <CheckBox
                  checkedColor="green"
                  checked={items.checked}
                  onPress={() => changeCheck(items.uuid, !items.checked)}
                />
                <Text style={styles.title}>
                  {items.item} ||| {items.quantidade}
                </Text>
                <Entypo.Button
                  name="trash"
                  color={'red'}
                  backgroundColor={''}
                  underlayColor={''}
                  onPress={() => remover(items.uuid)}
                />
              </View>
            )
          })}
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.inpCont}>
          <TextInput
            maxLength={20}
            label="Item"
            style={styles.Input1}
            mode="outlined"
            placeholder='Ex. "Arroz"'
            onChangeText={(List) => setList(List)}
            value={List}
          />
          <TextInput
            maxLength={3}
            keyboardType="numeric"
            label="Quantidade"
            style={styles.Input2}
            mode="outlined"
            placeholder='Ex. "10"'
            onChangeText={(Quant) => setQuant(Quant)}
            value={Quant}
          />
        </View>
  
        <View style={styles.line}></View>
        <Text style={styles.title}>Lista Limpeza</Text>
        <ScrollView style={styles.itemView}>
          {items.length > 0 ? (
            <ItemComponent items={items} />
          ) : (
            <Text style={styles.title}>No items</Text>
          )}
        </ScrollView>
        <View
          style={{
            borderTopColor: '#612F74',
            borderTopWidth: 2,
            width: '100%',
            height: 60,
          }}
        >
          <Text style={styles.title}>Total de itens: {items.length}</Text>
        </View>
        <FAB style={styles.fab} icon="pencil" onPress={onPress} />
        <FAB
          style={styles.fab2}
          icon="food-variant"
          onPress={()=>navigation.navigate('TabThreeScreen1')}
        />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      flex: 1,
      flexWrap: 'wrap',
      //alignItems: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#612F74',
      textAlign: 'center',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      color: 'blue',
      backgroundColor: '#612F74',
    },
    fab2: {
      position: 'absolute',
      margin: 16,
      left: 0,
      bottom: 0,
      color: 'blue',
      backgroundColor: '#612F74',
    },
    Input1: {
      width: '68%',
    },
    Input2: {
      width: '30%',
    },
    line: {
      marginTop: 10,
      width: '100%',
      height: 3,
      backgroundColor: '#612F74',
    },
    inpCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      width: '95%',
    },
    itemView: {
      flex: 1,
      alignContent: 'center',
      width: '100%',
      marginTop: 10,
      marginBottom: 50,
    },
    item: {
      borderColor: '#612F74',
      borderWidth: 2,
      width: '98%',
      alignItems: 'center',
      marginTop: 3,
      flexWrap: 'wrap',
      flexDirection: 'row',
      borderRadius: 15,
      justifyContent: 'space-between',
    },
  })
  