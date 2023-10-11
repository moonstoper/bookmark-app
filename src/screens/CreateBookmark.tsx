import { BackHandler, View } from "react-native";
import { Appbar, Divider, List, TextInput, useTheme } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { rootStackparams } from "../../App";
import { useEffect, useState } from "react";
import { TextField } from "react-native-ui-lib";
import cardInterface from "../types/bookmark";
import { TouchableOpacity } from "react-native-gesture-handler";
import Card from "../components/Card";
type prop = NativeStackScreenProps<rootStackparams, "CreateBookmarks">;
export default function CreateBookmark({ navigation, route }: prop) {
    // navigation.setParams({edit:false,bookmarkId:"abc1"})
    console.log(route.params.bookmarkId)
    const { colors } = useTheme()
    function onbackPress() {
        navigation.pop()
    }
    const [url, seturl] = useState("")
    function onTextChange(e: any) {
        console.log(e)
    }
    const [_id, set_id] = useState("customID");
    const [website, setwebsite] = useState<cardInterface>({
        url: "https://",
        title: "Website Title",
        isfavourites: false,
        tags: [],
        favicon: []
    })
    // console.log(route.params)
    useEffect(() => {
        const unsubscribeBackButton = BackHandler.addEventListener("hardwareBackPress", () => {
            // console.log(isExtended)
            navigation.pop()
            return true
        })

        return () => unsubscribeBackButton.remove();
    }, [])

    return <View>
        <Appbar.Header elevated={true} style={{ marginVertical: 20 }}>
            <Appbar.BackAction onPress={() => onbackPress()}></Appbar.BackAction>
            <Appbar.Content title={!route.params.edit ? "Create" : "Edit"}></Appbar.Content>
        </Appbar.Header>
        <View style={{
            paddingHorizontal  :20
        }}>

        <Card value={{ ...website, _id }} />

        
        </View>
        <Divider/>
        <View style={{
            paddingHorizontal: 20,
            paddingVertical: 30,
            gap: 10
        }}>
            <List.Item title={"URL"}></List.Item>
            <TextInput placeholder="https://" style={{ marginHorizontal: 10 }} onChangeText={text=>{
                setwebsite({...website,url:text})
            }} >
            </TextInput>
            <List.Item title={"Add tags"}
                right={props =>
                    <List.Icon {...props} color={colors.onSurface} icon="arrow-right-thin" />
                }
            ></List.Item>
            <List.Item title={website.isfavourites ? "Remove from Favourites" : "Set as Favourite"}
                right={props =>
                    <TouchableOpacity
                        onPress={() => { setwebsite({ ...website, isfavourites: !website.isfavourites }) }}

                    >

                        <List.Icon {...props} color={colors.primary} icon={website.isfavourites ? "cards-heart" : "cards-heart-outline"} />
                    </TouchableOpacity>
                }
            ></List.Item>
        </View>
    </View>
}