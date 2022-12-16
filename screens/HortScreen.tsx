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
  orderByChild,
  query,
} from 'firebase/database'

import { CheckBox } from 'react-native-elements'
import { db } from '../firebase/firebase'
import { Entypo,Fontisto,MaterialCommunityIcons } from '@expo/vector-icons'
import {RootTabScreenProps} from '../types'
import { FloatingAction } from "react-native-floating-action";
import { SafeAreaView } from 'react-native-safe-area-context'


export default function HortScreen({ navigation }: RootTabScreenProps<'HortScreen'>) {
  const [List, setList] = useState('')
  const [Quant, setQuant] = useState('')
  const [items, setItems] = React.useState([])

  const actions = [
    {
      text: "Alimento",
      icon: <MaterialCommunityIcons name="rice" size={24} color="#004D40" />,
      name: "AlimentScreen1",
      position: 1,
      color:'#00BFA5'

    },
    {
      text: "Açougue",
      icon: <MaterialCommunityIcons name="cow" size={24} color="#004D40" />,
      name: "AcougScreen",
      position: 2,
      color:'#00BFA5'
    },
    {
      text: "Hortifruti",
      icon: <MaterialCommunityIcons name="fruit-grapes-outline" size={24} color="#004D40" />,
      name: "HortScreen",
      position: 3,
      color:'#A7FFEB'
    },
    {
      text: "Limpeza",
      icon: <MaterialCommunityIcons name="spray-bottle" size={24} color="#004D40" />,
      name: "LimpList",
      position: 4,
      color:'#00BFA5'
    }
  ];

const list = query(ref(db, `Market List/Hortifruti`), orderByChild('Hortifruti'))
  //read
  useEffect(() => {
    onValue(list, (snapshot) => {
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
    const newPostKey = push(child(ref(db), 'Market List/Hortifruti')).key
    set(ref(db, `Market List/Hortifruti/${newPostKey}`), {
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
    update(ref(db, 'Market List/Hortifruti/' + id), {
      checked: checked,
      uuid: id,
    })
    setList('')
    setQuant('')
  }
  const remover = (id: string) => {
    remove(ref(db, 'Market List/Hortifruti/' + id))
  }


  function ItemComponent({ items }) {
    items = items.sort(function(x,y){
     let a = x.item.toUpperCase(),
         b = y.item.toUpperCase();
     return  a == b ? 0 : a > b ? 1 : -1
   })
   return (
     <View style={styles.container}>
       {items.map((items: any, index: string) => {
         return (
          
           <View key={index} style={styles.item}>
             <CheckBox
               uncheckedColor='#64FFDA'
               checkedColor="#64FFDA"
               checked={items.checked}
               onPress={() => changeCheck(items.uuid, !items.checked)}
             />
             <Text style={[styles.title,items.checked == true?({textDecorationLine:'line-through'}):(null)]}>
               {items.item} ||| {items.quantidade}
             </Text>
             <Entypo.Button
               name="trash"
               color={'#00BFA5'}
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
    <SafeAreaView style={styles.container}>
      <View style={styles.inpCont}>
        <TextInput
          selectionColor='#00695C'
          outlineColor='#64FFDA'
          activeOutlineColor='#64FFDA'
          placeholderTextColor={'#4DB6AC'}
          textColor='#B2DFDB'
          maxLength={20}
          label={<Text style={{color: '#4DB6AC'}}>Item</Text>}
          style={styles.Input1}
          mode="outlined"
          placeholder='Ex. "Arroz"'
          onChangeText={setList}
          value={List}
        />
        <TextInput
          selectionColor='#00695C'
         outlineColor='#64FFDA'
           activeOutlineColor='#64FFDA'
          placeholderTextColor={'#4DB6AC'}
          textColor='#B2DFDB'
          label={<Text style={{color: '#4DB6AC'}}>Quantidade</Text>}
          maxLength={3}
          keyboardType="numeric"
          style={styles.Input2}
          mode="outlined"
          placeholder='Ex. "10"'
          onChangeText={setQuant}
          value={Quant}
        />
      </View>

      <View style={styles.line}></View>
      <Text style={styles.title}>Lista Hortifruti</Text>
      <ScrollView  style={styles.itemView}>
        {items.length > 0 ? (
          <ItemComponent items={items} />
        ) : (
          <Text style={styles.title}>No items</Text>
        )}
      </ScrollView>
      <View
        style={{
          borderTopColor: '#B2DFDB',
          borderTopWidth: 2,
          width: '100%',
          height: 40,
        }}
      >
        <Text style={styles.title}>Total de itens: {items.length}</Text>
      </View>
      <FAB style={styles.fab} color={'#004D40'} icon="pencil" onPress={onPress} />
      <View style={styles.fab2}>
      <FloatingAction    
        floatingIcon={<Fontisto  name='arrow-up' size={20} color={'#004D40'}/>} 
        position='left'
        color='#64FFDA'
        actions={actions}
        onPressItem={(name) =>navigation.navigate(name)}
  />
  </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    //alignItems: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004D40'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B2DFDB',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: -21,
    color: 'blue',
    borderRadius: 30,
    backgroundColor: '#64FFDA',
  },
  fab2: {
    position: 'absolute',
    margin: 0,
    left: 0,
    bottom: -27,
    color: 'blue',
    backgroundColor: '#64FFDA',
  },
  Input1: {
    width: '68%',
    backgroundColor:'#00695C',
    color: '#4DB6AC',
    tintColor: '#4DB6AC',
    textDecorationColor: '#4DB6AC'
  },
  Input2: {
    width: '30%',
    backgroundColor:'#00695C',
    color: '#4DB6AC',
    tintColor: '#4DB6AC',
    textDecorationColor: '#4DB6AC'
  },
  line: {
    marginTop: 10,
    width: '100%',
    height: 3,
    backgroundColor: '#B2DFDB',
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
    marginBottom: 5,
    backgroundColor: '#004D40'
  },
  item: {
    borderColor: '#64FFDA',
    backgroundColor:'#00695C',
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

/*<FAB
style={styles.fab2}
icon="spray-bottle"
onPress={()=>navigation.navigate('LimpList')}
/>*/