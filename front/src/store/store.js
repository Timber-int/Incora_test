import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import movieReducer from "./MovieSlice";
import pageReducer from "./pageSlice";

export const store = configureStore({
    reducer: {
        authReducer,
        movieReducer,
        pageReducer,
    }
});
