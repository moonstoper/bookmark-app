/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground, useColorScheme } from "react-native";
import { Appbar, Searchbar, configureFonts, useTheme, customText } from "react-native-paper";
import { themeContext } from "../context/themeContext";


interface TopbarInterface {
    headerName: string,
}


/**
 * 
 * @returns Top Bar of the Home Page which containes Logo and Profile 
 * @todo Insert SVG for Logo and Profile, improve UI
 */

export default function TopBar({ headerName }: TopbarInterface): JSX.Element {


    const [showsearch, setsearch] = useState(false);
    // const Text = customText<Font>()
    const { colors } = useTheme()
    const search = () => {
        setsearch(!showsearch)
    }
    const {currentMode} = useContext(themeContext)

    return (

        <ImageBackground source={useColorScheme()==="dark"? require("../images/art.jpg"): require("../images/artday.jpeg")} >
            <Appbar.Header elevated={true} style={{ marginVertical: 20, backgroundColor: "#0000" }}>
                {!showsearch && <Appbar.Content mode="large"  title={headerName} titleStyle={{
                    color:colors.background,
                    fontFamily:'theboldfont',
                    fontWeight:"600",shadowRadius:40,
                    
                }} />}

                {
                    !showsearch && useRoute().name === "BookmarkList" && <Appbar.Action icon={'magnify'}
                        onPress={search}
                    />
                }
                {
                    showsearch && <Searchbar placeholder="search" value="" icon={"arrow-left"} onIconPress={search} />
                }
            </Appbar.Header>


        </ImageBackground>


    );
}



const styles = StyleSheet.create({

    icon: {
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 30,
        color: "white"
    }
})