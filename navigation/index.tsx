/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { MaterialIcons } from '@expo/vector-icons'; 


import GastoScreen from '../screens/GastoScreen';
import AlimentScreen from '../screens/AlimentScreen';


export default function Navigation(/*{ colorScheme } : {colorScheme : ColorSchemeName}*/) {
  return (  
    <NavigationContainer
      /*linking={LinkingConfiguration}*/
     /* theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}*/>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
 const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bottom" component={BottomTabNavigator} options={{headerShown:false}} />
      <Stack.Screen name = "GastoScreen" component={GastoScreen} options={{headerShown: false}}/>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({route}: RootTabScreenProps<'TabOne'>){
  const {text} : any   = /*route.params */ 'teste'
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="AlimentScreen"
      screenOptions={{
        tabBarActiveTintColor: '#E0F2F1',
        tabBarInactiveTintColor: '#4DB6AC',
        tabBarStyle:{
          borderColor: '',
          backgroundColor: '#004D40',
        }
      }}>

      <BottomTab.Screen
        name="AlimentScreen"
        component={AlimentScreen}
        options={({}: RootTabScreenProps<'AlimentScreen'>) => ({
        title: 'Market List',
        tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color}/>,
        headerShown:false,
        })}
      />
      
      <BottomTab.Screen
        name="GastoScreen"
        component={GastoScreen}
        options={({}: RootTabScreenProps<'GastoScreen'>) => ({
        title: 'Gastos Mensais',
        tabBarIcon: ({ color }) => <MaterialIcons name="attach-money" size={24} color={color} />,
        headerShown:false,
        })}
        initialParams={{index: 0}}
      />

    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
 function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}

/*<BottomTab.Screen
name="TabOne"
initialParams={{text}}
component={TabOneScreen}
options={({}: RootTabScreenProps<'TabOne'>) => ({
  headerShown : false,
  title: 'Home',
  tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
})}
/>
<BottomTab.Screen
name="TabTwo"
component={TabTwoScreen}
options={{
  headerShown : false,
  title: 'User',
  tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
}}
/>*/