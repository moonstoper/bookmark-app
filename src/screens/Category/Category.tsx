import { Text } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { categoryparams } from "./CategoryStack";
import { FlatList } from "react-native-gesture-handler";
import bookmarksEx from "../Bookmarks/bookmarksexample.json"
import Card from "../../components/Card";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo,useRef } from "react";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<categoryparams,"Category">
export default function Category(Category:Props) {
    // const rootNavigation = Category.navigation.setOptions({
    //     headerTitleAlign:'center'
    // })
    const snapRPoints = useMemo(()=>['5%','25%'],[])
const bRef = useRef<BottomSheet>(null)
    return <View>
        <Text style={{color:"black",fontSize:50}}>{Category.route.params.icon}{Category.route.params.name}</Text>
        <FlatList data={bookmarksEx}  keyExtractor={item => item._id} 
        renderItem={({ item }): any => {
            {

                return <TouchableOpacity onPress={()=>{Category.navigation.getParent()?.getParent()?.navigate("CreateBookmarks")}} >
                    <Text>Great</Text>
                </TouchableOpacity>
            }
        }}
        >

        </FlatList>
    </View>
}