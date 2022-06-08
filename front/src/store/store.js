import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import movieReducer from "./movieSlice";
import pageReducer from "./pageSlice";
import genreReducer from "./genreSlice";

export const store = configureStore({
    reducer: {
        authReducer,
        movieReducer,
        pageReducer,
        genreReducer,
    }
});
