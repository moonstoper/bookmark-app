import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, BackHandler, FlatList, Linking, Share, StyleSheet, Text, useColorScheme, View, Animated } from "react-native";
import { Divider, FAB, List, useTheme } from "react-native-paper";
import TopBar from "../../components/TopBar";
import books from "./bookmarksexample.json"
import Card from "../../components/Card";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { red100 } from "react-native-paper/src/styles/themes/v2/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { rootTabparams } from "../../../TabNavigator";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import Clipboard from "@react-native-clipboard/clipboard";
// import Animated from "react-native-reanimated";
function darkmode() {

    const fontColor = useColorScheme() == "dark" ? "white" : "black"
    return {
        color: fontColor
    }
}




type prop = MaterialBottomTabScreenProps<rootTabparams, "bookmarks">;


/**
 * 
 * 
 * @component bookmarks list component in the Main page
 */
export default function Bookmarks({ navigation }: prop): JSX.Element {

    const [isExtended, setExtended] = useState(false)
    const { colors } = useTheme()
    /**
     * 
     * @styles Stylesheet for the Bookmarks
     */
    const styles = StyleSheet.create({
        flatlist: {
            flexGrow: 1,
            paddingBottom: 300,

        }

    })

    const [bookmarkData, setbookmarkData] = useState<any>({})

    const snapRPoints = useMemo(() => ['60%'], [])
    const bRef = useRef<BottomSheetModal>(null)


    const showpaper = (item: any) => {

        setExtended(true)
        setbookmarkData(item)
        bRef.current?.present()

    }

    useEffect(() => {
        // bRef.current?.snapToIndex(-1);
        const unsubscribeBackButton = BackHandler.addEventListener("hardwareBackPress", () => {
            // console.log(isExtended)
            if (isExtended) {
                console.log("inside event listener")
                bRef.current?.close()
                setExtended(false)

            }
            return true
        })

        return () => unsubscribeBackButton.remove();
    })

    const handlechange = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        // setExtended(false)
    }, []);

    return (
        <Animated.View style={{
            borderColor: red100,
            flex: 1
        }}>
            <TopBar headerName={"bookmarks"} />
            <View>
                <FlatList data={books} keyExtractor={item => item._id}
                    scrollEnabled={true}
                    ItemSeparatorComponent={({ highlighted }): any => {
                        return (
                            <View style={{ paddingHorizontal: 15 }}>

                                <Divider />
                            </View>
                        )
                    }}
                    renderItem={({ item }): any => {
                        {

                            return (
                                <TouchableOpacity
                                    onPress={() => { showpaper(item) }}
                                    key={item._id}
                                >
                                    <Card value={item} key={item._id}

                                    ></Card>

                                </TouchableOpacity>

                            );
                        }
                    }}
                    contentContainerStyle={styles.flatlist}
                    ListFooterComponent={({ }): any => {
                        return <View style={{
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                            alignItems: "center"
                        }}>
                            <Text style={{ color: "black" }}>No more to show</Text>
                        </View>
                    }}


                />

            </View>
            <FAB
                icon={'plus'}
                label={'Create'}
                onPress={() => navigation.getParent()?.navigate("CreateBookmarks", { edit: false, bookmarkId: "demo1" })}
                visible={true}

                // iconMode={'static'}

                color="white"
                style={{
                    bottom: 16,
                    right: 16,
                    position: 'absolute',
                    backgroundColor: colors.secondary,

                }}
            />

            <BottomSheetModal
                ref={bRef}
                index={0}
                snapPoints={snapRPoints}
                onChange={handlechange}
                enablePanDownToClose={true}
                style={
                    {
                        zIndex: 3,
                        shadowColor: "#ffffff",
                        marginBottom: 0
                    }
                }
                backgroundStyle={
                    {
                        backgroundColor: colors.background
                    }
                }
                backdropComponent=
                {(props) =>
                    <BottomSheetBackdrop {...props}
                        opacity={0.5}
                        enableTouchThrough={false}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                    // style={[{ backgroundColor: 'a8b7ef' }, StyleSheet.absoluteFillObject]} 
                    >

                    </BottomSheetBackdrop>
                }


            >


                <List.Subheader numberOfLines={2} >{bookmarkData.title}</List.Subheader>
                <Divider />
                <List.Section >
                    <List.Item title={"Open in browser"} onPress={() => Linking.openURL(bookmarkData.url)} ></List.Item>
                    <List.Item title={"Copy URL"} onPress={() => Clipboard.setString(bookmarkData.url)} ></List.Item>
                    <List.Item title={"Share"} onPress={() => Share.share({ url: bookmarkData.url, message: bookmarkData.url, title: bookmarkData.title })} ></List.Item>

                </List.Section>
                <Divider />
                <List.Section>
                    <List.Subheader>{"Actions"}</List.Subheader>
                    <List.Item title={"Favourite"} onPress={() => { bRef.current?.close(); console.log("Pressed", bookmarkData) }} ></List.Item>
                    <List.Item title={"Edit"} onPress={() => {
                        bRef.current?.close();
                        navigation.getParent()?.navigate("CreateBookmarks", { edit: true, bookmarkId: bookmarkData._id })
                    }} ></List.Item>
                    <List.Item title={"Delete"} onPress={() => console.log("Pressed", bookmarkData)} ></List.Item>
                </List.Section>


            </BottomSheetModal >


        </Animated.View >
    );
}

