import { createContext, useEffect, useState } from "react";
import { adaptNavigationTheme, MD3Colors, MD3DarkTheme, useTheme } from "react-native-paper";
import { DarkTheme as NavigationDarkTheme, DefaultTheme, DefaultTheme as NavigationDefaultTheme, Theme } from '@react-navigation/native';
import { Appearance } from "react-native"
export const themeContext = createContext({
    // setTheme : (theme:any)=>{}
});

export const ThemeProvider = ({ children }: any) => {
  
   
   console.log(Appearance.getColorScheme())
    return <themeContext.Provider value={{}} >
        {children}
    </themeContext.Provider>
}