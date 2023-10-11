/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
// import {SafeAreaProvider} from "react-native-safe-area-context"
import { GestureHandlerRootView ,gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Root from './Root';
AppRegistry.registerComponent(appName, () => 

//    <GestureHandlerRootView style={{flex:1}}> <App/> </GestureHandlerRootView>
   
   gestureHandlerRootHOC(Root)
);
