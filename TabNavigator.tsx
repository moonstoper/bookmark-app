import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Bookmarks from "./src/screens/Bookmarks/Bookmarks";
import Profile from "./src/screens/Profile";
import CategoryStack from "./src/screens/Category/CategoryStack";
import Search from "./src/screens/Search";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useTheme } from "react-native-paper";
export type rootTabparams = {
  bookmarks: any;
  Search: any;
  Categories: any,
  Profile: any,

}

/**
 * 
 * @returns Bottom Navigations and Screens
 * @Screens bookmarks, search, categories, profile
 */
const TabNavigationView = (): JSX.Element => {
  const TabNavigator = createMaterialBottomTabNavigator<rootTabparams>()
  const {colors} = useTheme()
  return (
    <BottomSheetModalProvider>

      <TabNavigator.Navigator
        // labeled={false}
       
        shifting={true}
        barStyle={{
          height : 70,
         
        }}
        testID="materialBottomTab"
      >
        <TabNavigator.Screen options={{
          tabBarIcon: "bookmark-outline",
        }} name='bookmarks' component={Bookmarks}></TabNavigator.Screen>
        <TabNavigator.Screen options={{
          tabBarIcon: "magnify"
        }} name="Search" component={Search}></TabNavigator.Screen>
        <TabNavigator.Screen options={{
          tabBarIcon: "grid"
        }}
          name="Categories" component={CategoryStack}></TabNavigator.Screen>
        <TabNavigator.Screen options={{
          tabBarIcon: "face-man-profile",
          tabBarBadge: true

        }} name='Profile' component={Profile}></TabNavigator.Screen>
      </TabNavigator.Navigator>
    </BottomSheetModalProvider>
  )
}

export default TabNavigationView;