import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Alert, BackHandler, FlatList, Linking, Share, StyleSheet, Text, useColorScheme, View, Animated, RefreshControl } from "react-native";
import { Banner, Divider, FAB, List, Searchbar, useTheme } from "react-native-paper";
import TopBar from "../../components/TopBar";
import books from "./bookmarksexample.json"
import Card from "../../components/Card";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { red100 } from "react-native-paper/src/styles/themes/v2/colors";
import { TouchableOpacity, TouchableNativeFeedback } from "react-native-gesture-handler";
import { rootTabparams } from "../../../TabNavigator";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import Clipboard from "@react-native-clipboard/clipboard";
import { bookmasrkCollection, deleteFirebook, getData } from "../../helpers/firestorehelper";
import { loginContext } from "../../context/logincontext";
import { useDispatch, useSelector } from "react-redux";
import { deletebookmark, joinToArray } from "../../reducers/bookslice";
import cardInterface from "../../types/bookmark";
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
    const [visiblebanner, setvisiblebanner] = useState({
        visiblebanner: false,
        visiblebannertext: ""
    })
    const [isExtended, setExtended] = useState(false)
    const [refreshing, setrefreshing] = useState(false)
    const { user, initializing } = useContext(loginContext)
    const storeRedux = useSelector((state: any) => state.bookmarks)
    const dispatch = useDispatch()
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

        onrefresh()
        const unsubscribeBackButton = BackHandler.addEventListener("hardwareBackPress", () => {
            // console.log(isExtended)
            if (isExtended) {
                console.log("inside event listener")
                bRef.current?.close()
                setExtended(false)

            }
            return true
        })
        Animated.timing(fadeAnim,{
            toValue: 1, duration: 1000,
            useNativeDriver: false
        }).start()
        
        return () => {unsubscribeBackButton.remove()
        
        }
    },[storeRedux.bookmark])

    const handlechange = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        // setExtended(false)
    }, []);

    async function onrefresh() {
        setrefreshing(true)
        await getData(user, initializing).then((data: any) => {
            dispatch(joinToArray(data))
        }).catch(e => {
            console.error("failed")
        })
        setrefreshing(false)
        console.log(storeRedux)
    }
    function deleteBook(id: any) {
        console.log("function to delete")
        setExtended(false)
        bRef.current?.forceClose()
        deleteFirebook(user, id).then(() => {
            setvisiblebanner({
                visiblebanner: true,
                visiblebannertext: "Deleted successfully"
            })
            getData(user,initializing).then((data)=>{
                dispatch(joinToArray(data))
            }).catch(e => {
                setvisiblebanner({
                    visiblebanner: true,
                    visiblebannertext: "Failed to refresh data"
                })
            })

        }).catch(e => {
            if (e === "User Not Found")
                setvisiblebanner({
                    visiblebanner: true,
                    visiblebannertext: "User not found"
                })
            else {
                setvisiblebanner({
                    visiblebanner: true,
                    visiblebannertext: "Failed to delete data"
                })
            }

        })

        setTimeout(() => {
            setvisiblebanner({
                visiblebanner: false,
                visiblebannertext: ""
            })
            setbookmarkData({})
        }, 2000)


    }

    const style = StyleSheet.create({
        searchbox: {

            marginTop: 20,
            paddingHorizontal:20
        },
        searchview: {
            paddingHorizontal: 20,

        }


    })
   const [query,setquery] = useState("")
   const [sdata,sdataset] = useState([])
   const ontextChange=(text:string)=>{
    setquery(text)
    if(text===""){
        sdataset([])
        return 
    }
    else{
        let newdatatitle = storeRedux.bookmarkArray.filter(({ title, url, tags }: cardInterface) => {
            if (title.toUpperCase().includes(text.toUpperCase())) {
                // console.log(title,text)
                return true
            }
            if (url.toUpperCase().includes(text.toUpperCase())) {
                return true
            }

        });
        sdataset(newdatatitle)
    }
   }
   const [fadeAnim] = useState(new Animated.Value(0))
    return (
        <Animated.View style={{
            borderColor: red100,
            flex: 1,
            opacity:fadeAnim
        }}>
            <TopBar headerName={"bookmarks"} />
            <View style={style.searchbox}>
                <Searchbar onClearIconPress={e => { setquery(""); sdataset([]) }} value={query} placeholder="search" onChangeText={ontextChange} />
            </View>
            <Banner visible={visiblebanner.visiblebanner}  icon={"information-outline"} >

                <Text >{visiblebanner.visiblebannertext}</Text>
            </Banner>
            <View>
                <FlatList data={sdata.length===0?storeRedux.bookmarkArray:sdata} keyExtractor={item => item._id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onrefresh}></RefreshControl>}
                    scrollEnabled={true}
                    ItemSeparatorComponent={({ highlighted }): any => {
                        return (
                            <View style={{ paddingHorizontal: 15 }}>

                                <Divider />
                            </View>
                        )
                    }}
                    ListEmptyComponent={<View style={{
                        paddingVertical: 20,
                        paddingHorizontal: 20,
                        alignItems: "center",
                        
                    }}>
                        <Text style={{ color: colors.onBackground,fontSize:20, fontFamily:'dealerplate california'}}>No bookmarks found !</Text>
                    </View>}
                    renderItem={({ item }): any => {
                        {

                            return (
                                <TouchableNativeFeedback
                                    onPress={() => { showpaper(item) }}
                                    key={item._id}
                                >
                                    <Card value={item} 

                                    ></Card>

                                </TouchableNativeFeedback>

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
                            <Text style={{ color: colors.onBackground }}>{storeRedux.bookmarkArray.length>0 ? "No more to show":""}</Text>
                        </View>
                    }}


                />

            </View>
            <FAB
                icon={'plus'}
                
                label={'Create'}
                
                onPress={() => navigation.getParent()?.navigate("CreateBookmarks", { edit: false, bookmarkObject: {} })}
                visible={true}

                // iconMode={'static'}

                color={colors.background}
                style={{
                    bottom: 16,
                    right: 16,
                    position: 'absolute',
                    backgroundColor: colors.onSecondaryContainer,

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
                    {/* <List.Item title={"Favourite"} onPress={() => { bRef.current?.close(); console.log("Pressed", bookmarkData.) }} ></List.Item> */}
                    <List.Item title={"Edit"} onPress={() => {
                        bRef.current?.close();
                        navigation.getParent()?.navigate("CreateBookmarks", { edit: true, bookmarkObject: bookmarkData })
                    }} ></List.Item>
                    <List.Item title={"Delete"} onPress={(e) => { deleteBook(bookmarkData._id) }} ></List.Item>
                </List.Section>


            </BottomSheetModal >


        </Animated.View >
    );
}

