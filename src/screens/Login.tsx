import AsyncStorage from "@react-native-async-storage/async-storage"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { View } from "react-native"
import { Button, TextInput, Text } from "react-native-paper"
import { rootStackparams } from "../../App";
import { loginContext } from "../context/logincontext";

type props = NativeStackScreenProps<rootStackparams, "LoginScreen">
/** 
* @task1 Create Facebook and Google Login or other (firebase ??)
*
*/

const Login = ({ navigation }: props) => {
    const { islogged, setlogged } = useContext(loginContext)
    const [username, setusername] = useState("")
    function onbuttonLogin() {

        setlogged(username)
        AsyncStorage.setItem("islogged", username)
        console.log(islogged)
    }
    return <View style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        paddingVertical: 100
    }}>
        <Text variant="displayMedium">bookmarks</Text>
        <TextInput placeholder="username" value={username}
            onChangeText={(e) => setusername(e)}>
        </TextInput>

        <Button onPress={e => onbuttonLogin()} >Login</Button>
        {/* <Button onPress={e=>console.log("facebook")} ></Button>
        <Button onPress={e=>console.log("Google")}></Button> */}

    </View>
}
export default Login
