import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { RootTabScreenProps } from '../types';
import { FontAwesome } from '@expo/vector-icons';
export default function TabOneScreen({navigation,route}: RootTabScreenProps<'TabOne'>) {

  
  const {text} : any  = route.params;
  
  return (
   <View style={styles.container}>
     <View style={{alignItems:'center',justifyContent: 'center',backgroundColor:'gray', width:50, height: 50 , borderRadius: 30}}>
     <FontAwesome name="user" size={40} color="#612F74" />
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
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#612F74'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
