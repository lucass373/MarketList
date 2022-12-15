import { StyleSheet } from 'react-native'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'
import { FAB } from 'react-native-paper'
import React, { memo, useMemo, useState, useEffect } from 'react'
import { MotiView } from 'moti'
import { TextInput as TextInput1 } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'
import { child, onValue, push, ref, remove, set } from 'firebase/database'
import { db } from '../firebase/firebase'
import MaskInput, { Masks } from 'react-native-mask-input'

export default function GastoScreen2({ navigation, route }) {
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
  const [Visible, setVisible] = useState(false)
  const [Flag, setFlag] = useState(0)
  const [Valor, setValor] = useState('')
  const [local, setLocal] = useState('')
  const [items, setItems] = useState([])
  const [Val, setVal] = useState('')
  const [Loc, setLoc] = useState('')
  const [Quando, setQuando] = useState('')

  const { index } = route.params

  //funcs
  //read
  useEffect(() => {
    onValue(ref(db, `Gastos/${meses[index]}`), snapshot => {
      setItems([])
      const data = snapshot.val()
      if (data !== null) {
        Object.values(data).map(items => {
          setItems(oldArray => [...oldArray, items])
        })
      }
    })
  }, [])

  //write
  const onPress = () => {
    const newPostKey = push(child(ref(db), 'Market List/alimento')).key
    const day = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()

    set(ref(db, `Gastos/${meses[index]}/${newPostKey}`), {
      day: day,
      month: month,
      year: year,
      value: Valor.replace('R$ ', '').replace(',', '.'),
      place: local,
      uuid: newPostKey
    })
    setValor('')
    setLocal('')
  }
  //remover
  const remover = (id: string) => {
    remove(ref(db, `Gastos/${meses[index]}/${id}`))
  }

  //total
  var total = items.reduce(getTotal, 0)
  function getTotal(total, item) {
    return parseFloat(total) + parseFloat(item.value)
  }

  function ItemComponent({ items }) {
    return (
      <View style={{ alignItems: 'center', flex: 1 }}>
        {items.map((items: any, index: string) => {
          return (
            <View
              key={index}
              style={{
                borderWidth: 1.5,
                borderRadius: 10,
                width: 350,
                borderColor: '#612F74',
                marginBottom: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row'
              }}
            >
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#612F74'
                    }}
                  >
                    Valor:{' '}
                  </Text>
                  <MaskInput
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#612F74'
                    }}
                    value={items.value}
                    mask={Masks.BRL_CURRENCY}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#612F74'
                    }}
                  >
                    Local:{' '}
                  </Text>
                  <TextInput
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#612F74'
                    }}
                    value={items.place}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#612F74'
                    }}
                  >
                    Dia:{' '}
                  </Text>
                  <MaskInput
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#612F74'
                    }}
                    value={`${items.day}${items.month}${items.year}`}
                    mask={Masks.DATE_DDMMYYYY}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => remover(items.uuid)}
                style={{ right: 10 }}
              >
                <Entypo name="trash" color="red" size={30} />
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {meses[index]} Total: R${total.toFixed(2)}
      </Text>
      <View style={{ justifyContent: 'flex-end', flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.itemView}>
            {items.length > 0 ? (
              <ItemComponent items={items} />
            ) : (
              <Text style={styles.title}>No items</Text>
            )}
          </ScrollView>
        </View>
        <View style={{ height: 50 }}>
          <View>
            {(Visible == false && Flag === 0) ||
            (Visible == true && Flag === 0) ? (
              <MotiView
                style={{
                  right: 120,
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
                from={{ translateX: 0 }}
                animate={{ translateX: 0 }}
                transition={{
                  delay: 0
                }}
              >
                <TextInput
                  maxLength={20}
                  label={'Valor(R$)'}
                  style={styles.valImp}
                  mode="outlined"
                  placeholder='Ex. "10.00"'
                  keyboardType="numeric"
                  onChangeText={setValor}
                  value={Valor}
                />
              </MotiView>
            ) : (
              <>
                {Visible == false && Flag == 1 ? (
                  <MotiView
                    style={{
                      right: -5,
                      flexWrap: 'wrap',
                      justifyContent: 'center'
                    }}
                    from={{ translateX: 0 }}
                    animate={{ translateX: -260 }}
                    transition={{
                      delay: 0
                    }}
                  >
                    <MaskInput
                      maxLength={20}
                      mask={Masks.BRL_CURRENCY}
                      style={[styles.valImp, { width: 100 }]}
                      placeholder='Ex. "10.00"'
                      onChangeText={setValor}
                      value={Valor}
                    />
                    <MaskInput
                      maxLength={20}
                      keyboardType="numeric"
                      style={[styles.valImp]}
                      placeholder="Ex.Mercado"
                      onChangeText={setLocal}
                      value={local}
                    />
                  </MotiView>
                ) : (
                  <MotiView
                    style={{
                      right: -5,
                      flexWrap: 'wrap',
                      justifyContent: 'center'
                    }}
                    from={{ translateX: 0 }}
                    animate={{ translateX: 10 }}
                    transition={{
                      delay: 0
                    }}
                  >
                    <MaskInput
                      maxLength={20}
                      mask={Masks.BRL_CURRENCY}
                      style={[styles.valImp, { width: 100 }]}
                      placeholder='Ex. "10.00"'
                      onChangeText={setValor}
                      value={Valor}
                    />
                    <MaskInput
                      maxLength={20}
                      keyboardType="numeric"
                      style={[styles.valImp]}
                      placeholder="Ex.Mercado"
                      onChangeText={setLocal}
                      value={local}
                    />
                  </MotiView>
                )}
              </>
            )}
          </View>
          {
            <FAB
              onPress={() => [
                setVisible(!Visible),
                setFlag(1),
                (Visible == true && Valor != '') || local != ''
                  ? onPress()
                  : null
              ]}
              style={styles.fab}
              icon={
                (Visible == true && Valor != '') || local != ''
                  ? 'pencil'
                  : Visible == true && Valor == '' && local == ''
                  ? 'arrow-left'
                  : 'plus'
              }
            />
          }
        </View>
        <View style={styles.container2}>
          <Swiper
            onIndexChanged={index =>
              navigation.navigate('GastoScreen', { index: index })
            }
            index={index}
            dot={<></>}
            activeDot={<></>}
          >
            {meses.map((items: any, index: number) => {
              return (
                <View key={Date.now()} style={styles.barraMes}>
                  <Text style={[styles.title, { color: 'white' }]}>
                    {items}
                  </Text>
                </View>
              )
            })}
          </Swiper>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  valImp: {
    width: 115,
    borderColor: '#612F74',
    fontSize: 15,
    right: -10,
    marginLeft: 15,
    bottom: 5,
    height: 35
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    margin: 0,
    right: 0,
    bottom: 0,
    color: 'blue'
  },
  container2: {
    textAlign: 'center',
    justifyContent: 'flex-end',
    height: 40,
    backgroundColor: '#612F74',
    alignItems: 'center'
  },
  barraMes: {
    textAlign: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#612F74',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#612F74'
  },
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: -15,
    color: 'blue',
    backgroundColor: '#612F74'
  },
  itemView: {
    flex: 1,
    alignContent: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 5
  }
})
