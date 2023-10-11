import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Category from "./Category";
import CategoryList from "./CategoryLists";
// type Props = NativeStackScreenProps<{},"CategoryStack">;
export type categoryparams = {
    CategoryList:{
     
        BookmarkList:any,
    }
    Category:{
        name:string;
        icon:string;
        
    }

}
export default function CategoryStack() {
    const CategoryStack = createNativeStackNavigator<categoryparams>()

    // console.log(nav)
    return (
        <CategoryStack.Navigator initialRouteName="CategoryList">
            <CategoryStack.Screen name="CategoryList" options={{headerShown:false}} component={CategoryList}></CategoryStack.Screen>
            <CategoryStack.Screen name = "Category"
            options={({route})=>({title:route.params.icon+" "+route.params.name})} component={Category}></CategoryStack.Screen>
        </CategoryStack.Navigator>
    )

}