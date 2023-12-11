import { configureStore } from "@reduxjs/toolkit";
import bookslice from "./src/reducers/bookslice";

export default configureStore({
    reducer : {
        bookmarks : bookslice
    }
})