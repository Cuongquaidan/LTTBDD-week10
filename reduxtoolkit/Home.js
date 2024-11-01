import { View, Text ,SafeAreaView,Image,TextInput,Pressable} from 'react-native'
import {useState} from "react"
import {useAuth} from "./context/authContext"
const Home = ({navigation}) => {
  const {user,setUser} = useAuth()
  return (
    <SafeAreaView style={{display:"flex",alignItems:"center"}}>
      <Image source={require("./assets/note.png")} style={{width:300,height:300}}></Image>
      <Text style={{color:"#8353E2",fontSize:30,fontWeight:700, padding:50,textAlign:"center"}} >MANAGE YOUR TASK</Text>
      <TextInput value={user} onChangeText={(value)=>setUser(value)} style={{borderWidth:1, padding:10,width:300,borderRadius:6}} placeholder="Enter your name"></TextInput>      
      <Pressable style={{marginTop:40,padding:10,borderRadius:4,backgroundColor:"#00BDD6",color:"white"}} onPress={()=>navigation.navigate("Manage")}>GET STARTED</Pressable>
    </SafeAreaView>
  )
}

export default Home