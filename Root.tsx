
import App from "./App";
import { LoginProvider } from "./src/context/logincontext"
import { ThemeProvider } from "./src/context/themeContext";
import { Provider } from "react-redux";
import Store from "./Store";
export default function Root(): JSX.Element {
    return (
        
        <Provider store={Store}>
           
                <LoginProvider>

                    <App />
                </LoginProvider>
           
            </Provider>
       
    );

}