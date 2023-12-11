import React from "react";
import { View, Text, StyleSheet, useColorScheme, Dimensions, Image, TouchableOpacity, StyleProp } from "react-native";
import { Chip, Divider, IconButton, List, Snackbar, useTheme } from "react-native-paper";
import cardInterface from "../types/bookmark"
import { DesignTokens, Dividers, Icon, ListItem as ListUIL } from "react-native-ui-lib";
// import ImageTOShow from "../images/sample.png"
import Animated from "react-native-reanimated";
// const imageIs = Image.resolveAssetSource(ImageTOShow).uri

type carddata = cardInterface
export default function Card(props: { value: carddata}): JSX.Element {

    // function Tag(tagnames: any) {

    //     return () => tagnames.map(({ tag }: any) => {
    //         return <Chip mode="outlined">#{tag}</Chip>
    //     })

    // }

    let {  url, title, isfavourites, tags, favicon } = props.value
    // console.log(title)
    const { colors } = useTheme()
    const styles = StyleSheet.create({
        main: {
            display: "flex",
            flexDirection: "row",
            gap: 5,
            marginHorizontal: 15,
            marginVertical: 20,
            color: "black",
            maxWidth: "100%",
            overflow: "hidden"
        },
        title: {
            color: colors.inverseSurface,
            // fontFamily:'dealerplate california'
        },
        url: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5
            // justifyContent:"flex-start"
        },
        urltext: {
            color: colors.inverseSurface
        }
    })

    return (
        <View style={styles.main}>
            <View style={{ flexGrow: 1, width: 300, flex: 4, gap: 10 }}>
                <Text numberOfLines={1} style={styles.title}>{title}</Text>
                <View style={styles.url} >
                    {
                        favicon.length!==0 ?  <List.Icon icon={{uri:favicon[0]}} ></List.Icon>
                        :
                        <List.Icon icon={"web"} ></List.Icon>
                    }
                   
                    <Text numberOfLines={1} style={styles.urltext} >{url}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: 5, flexWrap: "wrap"  }}>
                    {/* {isfavourites && <Chip compact mode="outlined" icon="heart">{undefined}</Chip>} */}
                    {isfavourites && <List.Icon icon="heart" color={colors.primary}
                        style={{ borderWidth: 0, borderColor: colors.outline, borderRadius: 8, paddingHorizontal: 4 }} />}
                    {
                        tags.map((tag: any) => {
                            return <Chip key={tag} compact mode="outlined">#{tag}</Chip>
                        })
                    }
                </View>
            </View>
            {/* <Image style={{ width: 100 }} source={{ uri: imageIs }} /> */}


        </View>
    );

}

