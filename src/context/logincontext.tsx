import { createContext,useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import firebase from "@react-native-firebase/app"
 var loginContext = createContext({
    user : null,
    initializing : false
});
const LoginProvider = ({children}:any)=>{
   const [user,setuser] = useState<any>()
   const [initializing,setinitializing] = useState(true)
    useEffect(()=>{
        // setuser("usrename");
        // setinitializing(false)
        const subscribeauth = auth().onAuthStateChanged((fireuser)=>{
            setuser(fireuser)
            setinitializing(false)
        })
        return subscribeauth;
        // console.log(firebase.initializeApp({}))
        // console.log(JSON.stringify(auth))

    })
   
   
    return <loginContext.Provider value={{user,initializing}}>
       
        {children}
    </loginContext.Provider>
}

export {
    LoginProvider,
    loginContext
}