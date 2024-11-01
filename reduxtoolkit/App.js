import { Text, SafeAreaView, StyleSheet } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {NavigationContainer} from "@react-navigation/native"
import Home from "./Home"
import Manage from "./Manage"
import Add from "./Add"
import {AuthProvider} from "./context/authContext"
import { Provider } from 'react-redux';
// import store from './store';
import store from "./store.js"

const Stack = createNativeStackNavigator()
export default function App() {
  return (
     <Provider store={store}>
    <AuthProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName = "Manage">
    
       
          <Stack.Screen name="Manage" component={Manage} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="Add" component={Add} options={{headerShown: false}}></Stack.Screen>
     <Stack.Screen name="Home" component={Home} options={{headerShown: false}}></Stack.Screen>
       </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
      </Provider>
  );
}

