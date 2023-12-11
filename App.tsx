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

import firebase from '@react-native-firebase/app';
import { adaptNavigationTheme, Button, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, Theme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigationView from './TabNavigator';
import CreateBookmark from './src/screens/CreateBookmark';
import Login from './src/screens/Login';
import About from './src/screens/About'
import { loginContext, LoginProvider } from './src/context/logincontext';
import { lighttheme } from './src/theme/light';
import { darktheme } from './src/theme/dark';
import { themeContext } from './src/context/themeContext';
export type rootStackparams = {
  LoginScreen: any,
  CreateBookmarks: {
    edit: boolean,
    bookmarkObject: any
  },
  Explore: any,
  About:any

}

const nativeRootNavigation = createNativeStackNavigator<rootStackparams>();



// export type Apptheme = typeof theme
// export const useApptheme = useTheme<Apptheme>()

export default function App(): JSX.Element {

  const { user,initializing } = useContext(loginContext);
  const defaultTheme = useColorScheme()==="dark"?MD3DarkTheme:MD3LightTheme;
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  const newTheme = useColorScheme()==="dark"?darktheme : lighttheme
  const atheme: any = {
    // ...navTheme,
    ...defaultTheme,
    newTheme
  }
  // console.log(atheme.color)
  return <>
    <SafeAreaProvider >


      <PaperProvider theme={atheme}>


        <StatusBar backgroundColor={atheme.colors.surfaceVariant} animated={true} />
        {
          initializing ? <>
            <View>

              <Text>{JSON.stringify(firebase)}</Text>
            </View></>
            :
            <NavigationContainer theme={atheme} >


              <nativeRootNavigation.Navigator initialRouteName={'LoginScreen'}>
                {
                  !user  ? <>
                    <nativeRootNavigation.Screen name='LoginScreen' options={{headerShown:false}} component={Login}></nativeRootNavigation.Screen></>
                    : <>
                      <nativeRootNavigation.Screen name='Explore' options={{ headerShown: false }} component={TabNavigationView}></nativeRootNavigation.Screen>
                      <nativeRootNavigation.Screen options={{
                        headerShown: false
                      }} name='CreateBookmarks' component={CreateBookmark}></nativeRootNavigation.Screen>
                      <nativeRootNavigation.Screen options={{
                        headerShown: false
                      }} name='About' component={About}></nativeRootNavigation.Screen>
                    </>
                }



              </nativeRootNavigation.Navigator>
            </NavigationContainer>

        }
      </PaperProvider>
    </SafeAreaProvider>
  </>
}


