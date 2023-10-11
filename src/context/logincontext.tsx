import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState } from "react";
 var loginContext = createContext({
    islogged :"",
    setlogged :(logged:string)=>{},
    isloaded:false,
    setloaded:(loaded:boolean)=>{}
});
const LoginProvider = ({children}:any)=>{
    const [islogged,setlogged] = useState("")  
    const [isloaded,setloaded] = useState<boolean>(false)
   AsyncStorage.getItem("islogged").then(data=>{
  
        if(data!==null && data!==''){
            setlogged(data)
        }else{
            setlogged("")
        }
        setloaded(true)
   }).catch(e=>{
    setloaded(true)
   })
   
   
    return <loginContext.Provider value={{islogged,setlogged,isloaded,setloaded}}>
       
        {children}
    </loginContext.Provider>
}

export {
    LoginProvider,
    loginContext
}