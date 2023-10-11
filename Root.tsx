import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import App from "./App";
import { LoginProvider } from "./src/context/logincontext"
import { ThemeProvider } from "./src/context/themeContext";

export default function Root(): JSX.Element {
    return (
        // <BottomSheetModalProvider>
            <ThemeProvider>
                <LoginProvider>

                    <App />
                </LoginProvider>
            </ThemeProvider>
        // </BottomSheetModalProvider>
    );

}