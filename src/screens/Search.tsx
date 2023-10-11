import {  Searchbar, Text } from "react-native-paper";
import { FlatList, StyleSheet, View} from "react-native"
import { useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import books from "../screens/Bookmarks/bookmarksexample.json"
import cardInterface from "../types/bookmark"
import Card from "../components/Card";
export default function Search({route,navigation}:any) {

    const style = StyleSheet.create({
        searchbox:{
        
            marginTop:20,
            // paddingHorizontal:20
        },
        searchview:{
            paddingHorizontal:20,
            
        }
        

    })
        const bottomRef = useRef<BottomSheet>(null);
        
    const [query,setquery] = useState("");
    const [showData,setData] = useState<any>()
    function ontextChange(text:string) {
        setquery(text);
        if(text=="")
       {    setquery("")
        // console.log(true)
            setData([])
            return
       }
        let newdatatitle = books.filter(({title})=>{
            if(title.toUpperCase().includes(text.toUpperCase())){
                // console.log(title,text)
                return true
            }
        });
        let newdataurl=books.filter(({url})=>{
            if(url.toUpperCase().includes(text.toUpperCase())){
                // console.log(url,text)
                return true
            }
        })
        setData(newdatatitle)
        
    }
    return (
        // <GestureHandlerRootView>

        <View style={style.searchview}>
            <View style={style.searchbox}>
            <Searchbar onClearIconPress={e=>{setquery("");setData([])}}  value={query} placeholder="search" onChangeText={ontextChange}/>
            </View>
            {
                showData !== null &&
            <FlatList data={showData}  renderItem={
               ({item})=>{
                return <Card value={item}></Card>
               }
                }
            >
            </FlatList>
            }

        </View>
    );
}