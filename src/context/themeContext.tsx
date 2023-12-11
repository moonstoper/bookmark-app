import { createContext, useEffect, useState } from "react";
import { adaptNavigationTheme, MD3Colors, MD3DarkTheme, useTheme } from "react-native-paper";
import { DarkTheme as NavigationDarkTheme, DefaultTheme, DefaultTheme as NavigationDefaultTheme, Theme } from '@react-navigation/native';
import { Appearance, useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
export const themeContext = createContext({
    currentMode : "light",
    updateTheme : (newTheme : "light"|"dark")=>{}
});

export const ThemeProvider = ({ children }: any) => {
  
   
   console.log(Appearance.getColorScheme())
   const [currentMode,setcurrentmode] = useState("light")
   const updateTheme = (newTheme:"light"|"dark") =>{
        console.log("inside update Theme")
        setcurrentmode(newTheme)
   }
   useEffect(()=>{
    try {
        
        
    } catch (error) {
       
    }
   },[])

 
    return <themeContext.Provider value={{currentMode,updateTheme}} >
        {children}
    </themeContext.Provider>
}