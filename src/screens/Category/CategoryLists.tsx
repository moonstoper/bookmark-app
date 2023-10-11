import React from "react"
import { BottomNavigationProps, Chip, List, Text, TouchableRipple, Card } from "react-native-paper"
import { View, FlatList, StyleSheet, useColorScheme, TouchableOpacity } from "react-native"
import tags from "../../tags.json"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabNavigationOptions, BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import TopBar from "../../components/TopBar"
// import { rootTabparams } from "../../../App"
import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs"
import { rootTabparams } from "../../../TabNavigator"
import { FlatGrid } from "react-native-super-grid"
import { categoryparams } from "./CategoryStack"
import { GridList, Spacings } from "react-native-ui-lib"


type Props = NativeStackScreenProps<categoryparams, "Category">;
export default function CategoryList({ navigation }: Props) {
    // headerShown = false
    const isDarkMode = useColorScheme() === "dark";
    const styles = StyleSheet.create({
        category: {
            // color : isDarkMode ? "black":"white",
            // backgroundColor : isDarkMode ? "black":"white"
        }
    })
    return (
        <View style={styles.category}>
            <TopBar headerName={"Categories"} />
            <FlatGrid itemDimension={120}
                data={tags}
                renderItem={({ item }) => (
                    <TouchableRipple onPress={()=>navigation.navigate("Category",{name:item.name,icon:item.emoji})}>
                    <Card  style={{
                        display:"flex",
                        flexDirection:"column",

                    }}>
                        <Card.Title title={item.name}></Card.Title>
                        <Card.Content style={{}}>
                            <Text style={{fontSize:30}}>
                                {item.emoji}
                            </Text>
                        </Card.Content>
                    </Card>
                    </TouchableRipple>

                )}
            >

            </FlatGrid>

        </View>
    )
}