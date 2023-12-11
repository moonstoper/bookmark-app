import { Alert, BackHandler, View ,Animated, ToastAndroid} from "react-native";
import { Appbar, Button, Chip, Divider, List, Modal, Portal, Text, TextInput, useTheme, IconButton, Banner, ProgressBar, ActivityIndicator } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { rootStackparams } from "../../App";
import { useContext, useEffect, useId, useState } from "react";
// import { Icon, TextField } from "react-native-ui-lib";
import cardInterface from "../types/bookmark";
import { TouchableOpacity } from "react-native-gesture-handler";
import Card from "../components/Card";
import urlMetadata from "url-metadata";
import { debouncesearch, getrooturl, searchtags, tagsjson, urlcheck } from "../helpers/createhelper";
import extractDomain from "extract-domain";
import _ from "lodash"
import { createbookmarkFire } from "../helpers/firestorehelper";
import { loginContext } from "../context/logincontext";
import { useSelector } from "react-redux";
// import Animated from "react-native-reanimated";
type prop = NativeStackScreenProps<rootStackparams, "CreateBookmarks">;
export default function CreateBookmark({ navigation, route }: prop) {
    const { user } = useContext(loginContext)
    const createid = useId()
    // const storeRedux = useSelector((state: any) => state.bookmarks)
    const [visiblebanner, setvisiblebanner] = useState({
        visible: false,
        visibletext: ""
    })
    const createnewBookmark = async () => {
        setvisiblebanner({
            visible:true,
            visibletext:"Saving Bookmark"
        })
        if (urlcheck(website.url)) {
            // fetchmetadata(text)
            console.log("correct url")

            debouncesearch(fetchmetadata(website.url, true), 2000)

        } else {
            setnotvalidurl(true)
            setvisiblebanner({
                visible:true,
                visibletext:"Url not found"
            })
            setTimeout(() => {
                setvisiblebanner({
                    visible:false,
                    visibletext:""
                })
            }, 3000);
            return
            console.log("incorrect url")
        }
        // return

    }

    const fetchmetadata = async (fetchurl: string, create: boolean) => {
        try {
            // const fetchurl = website.url;

            const urldata = await urlMetadata(fetchurl);
            let { url, title, og, favicons } = urldata;

            if (favicons === undefined) {
                favicons = []
            }
            const fav: any = favicons
            let webtitle: any = title
            console.log("webtitle",webtitle)
           if(webtitle===undefined || webtitle.length===0){
            webtitle = urldata['application-name'] ? urldata['application-name'] : "Title"
           }
           console.log("webtitle",webtitle)

            console.log(fetchurl, urldata)
            let favarray: any[] = []


            let rooturl: any = getrooturl(fetchurl)
            console.log()
            if (typeof (fav) !== "string") {
                fav.map((el: any) => {
                    console.log(el)
                    // if(el.href.substring())
                    if (el.href[0] == "/") {
                        el.href = rooturl + el.href
                    }
                    favarray.push(el.href)
                })
            }
            console.log(favarray)
            console.log()
            setwebsite({
                ...website,
                ["url"]: fetchurl,
                ["title"]: webtitle,
                favicon: favarray,
                
            })

            setnotvalidurl(false)
            if (create) {
                setvisiblebanner({ visible: true, visibletext: "Saving bookmark" })
                setnotvalidurl(false)
                // debugger
                console.log(website)
                if (urlcheck(website.url)) {
                    let res = await createbookmarkFire({
                        ...website,
                        ["url"]:fetchurl,
                        ["title"]:webtitle,
                        favicon : favarray
                    }, user)
                    if (res === "success") {
                        console.log("Yaay")
                        navigation.replace("Explore")
                        // navigation.push("Explore")
                    }
                }
                else
                    setnotvalidurl(true)
            }


        } catch (error) {
            setvisiblebanner({ visible: false, visibletext: "" })
            //show error
            setnotvalidurl(true)
            console.log("failed to fecth data", error)
            setvisiblebanner({
                visible:true,
                visibletext:"URL not found"
            })
            setTimeout(() => {
                setvisiblebanner({
                    visible:false,
                    visibletext:""
                })
            }, 3000);


        }

    }



    const [website, setwebsite] = useState<cardInterface>({
        _id: new Date().getTime().toString(),
        url: "https://",
        title: "Website Title",
        isfavourites: false,
        tags: ["ideas", "technology"],
        favicon: [],
    })
    const [notvalidurl, setnotvalidurl] = useState(false)
    const [tagmodalvisible, settagmodalvisible] = useState(false)

    const urlinput = async (text: string) => {
        setnotvalidurl(false)
       

        setwebsite({...website,url:text})
        if (!text.startsWith("https://") && !text.startsWith("http://")) {
            text = "https://" + text
        }
        if (urlcheck(text)) {
            // fetchmetadata(text)
            console.log("correct url")

            debouncesearch(fetchmetadata(text,false), 2000)
        } else {
            setnotvalidurl(true)
            console.log("incorrect url")
        }

    }

    // navigation.setParams({edit:false,bookmarkId:"abc1"})
    // console.log(route.params.bookmarkId)
    const { colors } = useTheme()
    function onbackPress() {
        if(!visiblebanner.visible)
        navigation.pop()
    else{
        setvisiblebanner({
            visible:true,
            visibletext:"Wait "+visiblebanner.visibletext
        })
        ToastAndroid.showWithGravity("Wait, Saving the document",5000,1)
    }
    }
    const [url, seturl] = useState("")
    function onTextChange(e: any) {
        console.log(e)
    }
    const [_id, set_id] = useState("customID");
    function runanimation(){
        Animated.timing(progressAnim,{
            toValue:100,
            duration:500,
            useNativeDriver: true
        }).start(()=>runanimation)
    }
    // console.log(route.params)
    useEffect(() => {
        const unsubscribeBackButton = BackHandler.addEventListener("hardwareBackPress", () => {
            // console.log(isExtended)

            console.log("alert")
            if(!visiblebanner.visible)
            navigation.pop()
            else{
                setvisiblebanner({
                    visible:true,
                    visibletext:"Wait "+visiblebanner.visibletext
                })
                ToastAndroid.showWithGravity("Wait, Saving the document",5000,1)
            }
            return true
        })
        // runanimation()
        if (route.params.edit) {

            setwebsite({
                ...route.params.bookmarkObject
            })
        } else {
            setwebsite({
                _id: new Date().getTime().toString(),
                url: "",
                title: "Website Title",
                isfavourites: false,
                tags: ["ideas", "technology"],
                favicon: [],
            })
        }


        return () => unsubscribeBackButton.remove();
    }, [])
    // const { colors } = useTheme()
    function chipclose(index: number) {
        website.tags.splice(index, 1);
        return undefined
    }
    const storeRedux = useSelector((state:any)=>state.bookmarks)
    const [avtags,setavtags] = useState([])
    const [shownotfoundtag, setnotfoundtag] = useState(false)
    const [searchtag, setsearchtag] = useState("")
    async function tagsearch(text: string) {

        // const abc = debouncesearch(urlcheck("wwww.google.com"),500).then(res:any=>{
        //     console.log(res)
        // })
        setsearchtag(text)
        setnotfoundtag(false)
        if (text.length < 3) {
            return
        }
        // _debounce()
        let res =
            storeRedux.tagstate.filter((tag:any) => {
                if (tag.includes(text.toLowerCase()))
                    return true
            })

        res = _.difference(res, website.tags)
        if (text.length >= 4 && res.length == 0) {
            //display create tag
            setnotfoundtag(true)
        }
        else {
            setavtags(res)
        }

    }
    function createtag() {
        if (searchtag.length > 3)
            addtag(searchtag)
    }
    function addtag(tag: string) {
        if (website.tags.length > 6) {
            console.error("Number of tags should not more than 6")
            return
        }
        let newtag = [...website.tags, tag]
        newtag = _.uniq(newtag)
        setwebsite({
            ...website,
            tags: newtag
        })
    }
    function chipClose(tag: string) {
        let newtags = website.tags

        try {
            newtags = _.filter(newtags, (itag: string) => {
                return itag !== tag
            })
    
            setwebsite({
                ...website,
                tags: newtags
            })
        } catch (error) {
            console.log(error)
        }

       


    }
    const [progressAnim] = useState(new Animated.Value(0))
    return <View>
        <Banner visible={visiblebanner.visible}  icon={"information-outline"} >
            
            <Text variant="headlineMedium">{visiblebanner.visibletext}</Text>
        </Banner>
        <Portal>
            <Modal visible={tagmodalvisible} onDismiss={() => { }}>
                <View style={{
                    backgroundColor: colors.background,
                    paddingHorizontal: 20,
                    paddingVertical: 30,
                    gap: 10

                }}>


                    <Text>Search Tags</Text>
                    <TextInput error={shownotfoundtag} autoComplete="off" autoCorrect={false} value={searchtag} onChangeText={text => { tagsearch(text) }}
                    ></TextInput>
                    {
                        shownotfoundtag && <Button onPress={createtag}>
                            Create New Tag
                        </Button>
                    }
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10
                    }}>


                        {
                            shownotfoundtag && <Text style={{
                                color: colors.error
                            }}>Nothing Found</Text>
                        }
                    </View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10
                    }}>
                        <Text>Click on Tags to add them</Text>

                        {
                            avtags && avtags.length > 0 &&
                            avtags.map((tag: any, index: number) => {
                                return <Chip key={index} onPress={e => addtag(tag)}>#{tag}
                                </Chip>
                            })
                        }
                    </View>
                    <Text>Tags</Text>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        
                    }}>
                        {
                            website.tags?.map((tag: any, index: number) => {
                                return <Chip  key={index} selected closeIcon={"close"} onClose={() => chipClose(tag)}  >#{tag}
                                </Chip>
                            })
                        }

                    </View>
                    <Button icon={"close"} mode="contained" style={{
                        // backgroundColor: "rgba(13, 52, 0,0.5)",


                    }} onPress={e => settagmodalvisible(false)}>Close</Button>
                </View>
            </Modal>
        </Portal>
        <Appbar.Header elevated={true} style={{ marginVertical: 20 }}>
            <Appbar.BackAction onPress={() => onbackPress()}></Appbar.BackAction>
            <Appbar.Content title={!route.params.edit ? "Create" : "Edit"}></Appbar.Content>
        </Appbar.Header>
       
        <View style={{
            paddingHorizontal: 20
        }}>

            <Card value={{ ...website, _id }} />


        </View>
        <Divider />
        <View style={{
            paddingHorizontal: 20,
            paddingVertical: 30,
            gap: 10
        }}>
            <List.Item title={"URL"}></List.Item>
            <TextInput error={notvalidurl} placeholder="https:// Fill your URL here !" autoFocus={true}  autoCapitalize="none" autoCorrect={false} style={{ marginHorizontal: 10 }} onChangeText={(text:any) => {
               urlinput(text)
            }} >
            </TextInput>
            <List.Item title={"Add tags"} onPress={e => { settagmodalvisible(true); console.log("pressed") }}
                right={props =>
                    <List.Icon {...props} color={colors.onSurface} icon="arrow-right-thin" />
                }
            ></List.Item>
            <List.Item title="Favourites"  onPress={() => { setwebsite({ ...website, isfavourites: !website.isfavourites }) }}
                right={props =>
                    <TouchableOpacity
                       

                    >

                        <List.Icon {...props} color={colors.primary} icon={website.isfavourites ? "cards-heart" : "cards-heart-outline"} />
                    </TouchableOpacity>
                }
            ></List.Item>
           
            <Button style={{}} onPress={e => { createnewBookmark() }}  mode="contained" disabled={visiblebanner.visible}>
            
                {route.params.edit ? "Save" : "Create"}</Button>
        </View>
    </View>
}