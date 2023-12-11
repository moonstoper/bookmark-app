import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { Appearance, View, useColorScheme } from "react-native";
import { Banner, Button, Card, List, Switch, Text, useTheme } from "react-native-paper";
import { rootTabparams } from "../../TabNavigator";
import TopBar from "../components/TopBar";
import { loginContext } from "../context/logincontext";
import { themeContext } from "../context/themeContext";
import auth from "@react-native-firebase/auth"
import { GridList, Icon, Card as RnuCard } from "react-native-ui-lib"
import ListAccordion from "react-native-paper/lib/typescript/src/components/List/ListAccordion";
import { tagsjson } from "../helpers/createhelper";
import { getData } from "../helpers/firestorehelper";
import { useDispatch, useSelector } from "react-redux";
import { joinToArray } from "../reducers/bookslice";
type props = MaterialBottomTabScreenProps<rootTabparams, "Profile">

/**
 * @username  islogged
 *  
 */


export default function Profile({ navigation }: props) {
    const { user, initializing } = useContext(loginContext)
    // const {currentMode} = useContext(themeContext)
    const [visiblebanner, setvisiblebanner] = useState({
        isvisible: false,
        text: ""
    })
    const { colors } = useTheme()

    const bookmarkstate  = useSelector((state:any)=>state.bookmarks)
    const dispatch = useDispatch()
    const {currentMode,updateTheme}  = useContext(themeContext)
    function onlogout() {
        console.log("logout fn")
        // setTheme(theme+1)
        // navigation.getParent()?.navigate("LoginScreen")
        //
    }
    async function signOutFn() {
        setvisiblebanner({
            isvisible: true,
            text: "Signing Out"
        })
        setTimeout(() => {
            auth().signOut()
            
        }, 2000);



    }

    const profileInfo = (): JSX.Element => {
        return <View style={{
            // paddingHorizontal:5
        }} >
            <View style={{
                // paddingHorizontal: 10,
                paddingVertical: 10
            }}>
                <GridList data={[{
                    "topic": "Bookmarks",
                    "count": bookmarkstate.bookmarkArray.length.toString()
                }, {
                    "topic": "Tags",
                    "count": bookmarkstate.tagstate.length >0  ? bookmarkstate.tagstate.length.toString() : '0'
                }]} renderItem={(tags) => (
                    <Card>
                        <Card.Title style={{
                            alignContent: "center"
                        }} title={tags.item.topic}></Card.Title>
                        <Card.Title title={tags.item.count}></Card.Title>
                    </Card>
                )} numColumns={2} itemSpacing={10} listPadding={10}>
                </GridList>

            </View>


            <Button style={{
                // backgroundColor:"rgb(50,50,50)"
                paddingLeft: 10,
                paddingRight: 10
            }} icon="arrow-right" onPress={e => { signOutFn() }} >SignOut</Button>
        </View>
    }

    async function loginwithgoogle() {
        // console.log(bookmarkArray)
    //    let data:any = await  getData(user,initializing)
    //     dispatch(joinToArray(data))
    //     console.log("1111:::::\n",state)
    //     // throw new Error("Function not implemented.");
    }

    function loginwithOther(): void {
        throw new Error("Function not implemented.");
    }

    async function themeChange() {
        console.log("theme changing")
        const newMode = currentMode === "dark" ? "light":"dark"
        try {
            // await AsyncStorage.setItem('theme',newMode)
            updateTheme(newMode)
            
        } catch (error) {
            console.log(error)
            setvisiblebanner({
                isvisible:true,
                text:"failed to set theme"
            })
            setTimeout(()=>{
                setvisiblebanner({
                    isvisible:false,
                    text:""
                })
            },2000)
        }
    }

    return (
        <View >
            <TopBar headerName={"Profile"} />
            <Banner visible={visiblebanner.isvisible} style={{

            }} icon={"information-outline"} >

                <Text variant="headlineMedium">{visiblebanner.text}</Text>
            </Banner>
            <List.Item title="About" onPress={(e)=> {navigation.getParent()?.navigate("About") }}></List.Item>
            {/* <List.Item
                title="Dark Mode"
                right={props => <Switch {...props} onChange={()=>{
                   themeChange()
                }} value={currentMode === "dark" ? true : false}  ></Switch>}
            /> */}

            {
                !initializing && user &&
                <View >
                    {
                        user.isAnonymous &&
                        <View style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            gap: 10
                        }}>
                            < Button mode="contained" onPress={e => loginwithgoogle()} style={{
                                backgroundColor: colors.error
                            }} icon={"google"}>Google Sign In</Button>
                            <Button mode="contained" style={{
                                backgroundColor: "rgb(10,10,90)"
                            }} onPress={e => loginwithOther()} icon={"apple"}>Apple Id</Button>

                        </View>

                    }

                    <List.Item titleNumberOfLines={10} title={user.displayName}></List.Item>
                    {
                        !user.isAnonymous &&
                        profileInfo()
                    }

                </View>

            }
        </View >
    )
}
