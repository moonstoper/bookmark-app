import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext } from "react";
import { Appearance, View } from "react-native";
import { Button, List, Text } from "react-native-paper";
import { rootTabparams } from "../../TabNavigator";
import TopBar from "../components/TopBar";
import { loginContext } from "../context/logincontext";
import { themeContext } from "../context/themeContext";
type props = MaterialBottomTabScreenProps<rootTabparams,"Profile">

/**
 * @username  islogged
 *  
 */


export default function Profile({navigation}:props) {
    const {islogged,setlogged} = useContext(loginContext)
    // const {theme}  = useContext(themeContext)
    function onlogout(){
        console.log("logout fn")
        // setTheme(theme+1)
         AsyncStorage.setItem("islogged","").then((data)=>{
             setlogged("")
             navigation.getParent()?.navigate("LoginScreen")
         })
    }
    return (
        <View>
            <TopBar headerName={"Profile"} />
            <List.Item  title="About"></List.Item>
            <List.Accordion title="Account">
                <List.Item title="Personal Details"></List.Item>
                <List.Item title="Delete Account"></List.Item>
            </List.Accordion>
            <Button  mode="contained" onPress={e=>onlogout()}>SignOut</Button>
        </View>
    )
}
