/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useEffect, useState } from 'react';
import {
  StatusBar, Text, useColorScheme, View,
} from 'react-native';


import { adaptNavigationTheme, Button, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, Theme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigationView from './TabNavigator';
import CreateBookmark from './src/screens/CreateBookmark';
import Login from './src/screens/Login';
import { loginContext, LoginProvider } from './src/context/logincontext';
export type rootStackparams = {
  LoginScreen: any,
  CreateBookmarks: {
    edit: boolean,
    bookmarkId: string
  },
  Explore: any

}

const nativeRootNavigation = createNativeStackNavigator<rootStackparams>();



// export type Apptheme = typeof theme
// export const useApptheme = useTheme<Apptheme>()

export default function App(): JSX.Element {

  const { islogged, isloaded } = useContext(loginContext);
  // const {theme} = useContext(themeContext)
  const defaultTheme = MD3LightTheme;
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  const navTheme = LightTheme
  const atheme: any = {
    // ...navTheme,
    ...defaultTheme,
    colors: {
      "primary": "rgb(56, 107, 1)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(183, 244, 129)",
      "onPrimaryContainer": "rgb(13, 32, 0)",
      "secondary": "rgb(95, 98, 0)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(229, 234, 93)",
      "onSecondaryContainer": "rgb(28, 29, 0)",
      "tertiary": "rgb(135, 82, 0)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(255, 221, 186)",
      "onTertiaryContainer": "rgb(43, 23, 0)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(253, 253, 245)",
      "onBackground": "rgb(26, 28, 24)",
      "surface": "rgb(253, 253, 245)",
      "onSurface": "rgb(26, 28, 24)",
      "surfaceVariant": "rgb(224, 228, 214)",
      "onSurfaceVariant": "rgb(68, 72, 62)",
      "outline": "rgb(116, 121, 109)",
      "outlineVariant": "rgb(196, 200, 186)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(47, 49, 44)",
      "inverseOnSurface": "rgb(241, 241, 234)",
      "inversePrimary": "rgb(156, 215, 105)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(243, 246, 233)",
        "level2": "rgb(237, 241, 226)",
        "level3": "rgb(231, 237, 218)",
        "level4": "rgb(229, 236, 216)",
        "level5": "rgb(225, 233, 211)"
      },
      "surfaceDisabled": "rgba(26, 28, 24, 0.12)",
      "onSurfaceDisabled": "rgba(26, 28, 24, 0.38)",
      "backdrop": "rgba(45, 50, 40, 0.4)",
      "favouriteRed":"rgb(186, 26, 32)"
    }
  }
  // console.log(atheme.color)
  return <>
    <SafeAreaProvider >


      <PaperProvider theme={atheme}>


        <StatusBar backgroundColor={atheme.colors.surfaceVariant} animated={true} />
        {
          !isloaded ? <>
            <View>

              <Text>Loading</Text>
            </View></>
            :
            <NavigationContainer theme={atheme} >


              <nativeRootNavigation.Navigator initialRouteName={'LoginScreen'}>
                {
                  islogged === "" || islogged === null ? <>
                    <nativeRootNavigation.Screen name='LoginScreen' component={Login}></nativeRootNavigation.Screen></>
                    : <>
                      <nativeRootNavigation.Screen name='Explore' options={{ headerShown: false }} component={TabNavigationView}></nativeRootNavigation.Screen>
                      <nativeRootNavigation.Screen options={{
                        headerShown: false
                      }} name='CreateBookmarks' component={CreateBookmark}></nativeRootNavigation.Screen>
                    </>
                }



              </nativeRootNavigation.Navigator>
            </NavigationContainer>

        }
      </PaperProvider>
    </SafeAreaProvider>
  </>
}


