import AsyncStorage from "@react-native-async-storage/async-storage"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { ImageBackground, View, useColorScheme } from "react-native"
import { Button, TextInput, Text, useTheme, Snackbar } from "react-native-paper"
import { rootStackparams } from "../../App";
import { loginContext } from "../context/logincontext";
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '114048869672-guq84petc52l10j66u7fdl8v4tck09kt.apps.googleusercontent.com'
})

type props = NativeStackScreenProps<rootStackparams, "LoginScreen">
/** 
* @task1 Create Facebook and Google Login or other (firebase ??)
*
*/

const Login = ({ navigation }: props) => {
  const { colors } = useTheme()
  const { user, initializing } = useContext(loginContext)
  const [username, setusername] = useState("")
  const [visiblesnack, setvisiblesnack] = useState(false)
  async function loginwithgoogle() {
    try {
      // await auth().signOut()
      const { idToken } = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential).then((fuser) => {

        setvisiblesnack(true)

      });

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("user cancelled")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("already in progress wait")
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // starting the one tap dialog failed
        console.log("PLAY_SERVICES_NOT_AVAILABLE")
      } else {
        // some other error happened
        console.log("error")
      }
    }
  }
  async function onbuttonLogin() {

    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });


  }
  return <View style={{
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingVertical: 50,
    paddingHorizontal: 50,
    gap: 5
  }}>
    <ImageBackground source={useColorScheme()==="dark"? require("../images/art.jpg"): require("../images/artday.jpeg")} imageStyle={{resizeMode:'cover',flex:1}}>

    <Text  style={{
      fontFamily: 'theboldfont',
      fontWeight: '500',
      alignContent: "center",
      paddingVertical: 200,
      color:colors.background,
      fontSize:40,
      
    }}>BOOKMARKS</Text>


    {/* <Button style={{
      position: "absolute",
      bottom: -50,
      right: 50,
      backgroundColor: colors.onSurfaceDisabled
    }} mode="contained" onPress={e => loginwithgoogle()} >{"Skip"} </Button> */}

      </ImageBackground>
    <Button mode="contained" onPress={e => loginwithgoogle()} style={{
      backgroundColor: colors.error,
      
    }} labelStyle={{fontSize:15,fontWeight:"bold"}} icon={"google"}>Sign In With GOOGLE</Button>
    {/* <Button mode="contained" style={{
      backgroundColor: colors.onSecondaryContainer
    }} onPress={e => onbuttonLogin} icon={"apple"} labelStyle={{fontWeight:"bold"}}>Apple ID</Button> */}
    <Snackbar
      visible={visiblesnack}
      onDismiss={()=>setvisiblesnack(false)}
      duration={5000}
      >
    
      Hey there! I'm a Snackbar.
    </Snackbar>
  </View>
}
export default Login


