import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {movieService} from "../servcies";
import {LOADING, REJECTED, RESOLVED} from "../constants";

export const getAllMovies = createAsyncThunk(
    'authSlice/getAllMovies',
    async ({page}, {dispatch, rejectWithValue}) => {
        try {
            const data = await movieService.getAllDiscoverMovie(page);
            return {movies: data};
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getMovie = createAsyncThunk(
    'authSlice/getMovie',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            const data = await movieService.getById(id);
            return {movie: data};
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);
export const getVideo = createAsyncThunk(
    'authSlice/getVideo',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            const data = await movieService.getVideo(id);
            return {video: data};
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState: {
        movies: [],
        errors: null,
        status: null,
        pages: null,
        movie: {},
        video: {},
    },
    reducers: {},
    extraReducers: {
        [getAllMovies.pending]: (state, action) => {
            state.status = LOADING;
            state.errors = null;
        },
        [getAllMovies.fulfilled]: (state, action) => {
            state.status = RESOLVED;
            state.movies = action.payload.movies.results;
            state.pages = action.payload.movies.total_pages;
            state.errors = null;
        },
        [getAllMovies.rejected]: (state, action) => {
            state.status = REJECTED;
            state.errors = action.payload;
        },
        [getMovie.pending]: (state, action) => {
            state.status = LOADING;
            state.errors = null;
        },
        [getMovie.fulfilled]: (state, action) => {
            state.status = RESOLVED;
            state.movie = action.payload.movie;
            state.errors = null;
        },
        [getMovie.rejected]: (state, action) => {
            state.status = REJECTED;
            state.errors = action.payload;
        },
        [getVideo.pending]: (state, action) => {
            state.status = LOADING;
            state.errors = null;
        },
        [getVideo.fulfilled]: (state, action) => {
            state.status = RESOLVED;
            state.video = action.payload.video;
            state.errors = null;
        },
        [getVideo.rejected]: (state, action) => {
            state.status = REJECTED;
            state.errors = action.payload;
        },
    },
});

const movieReducer = movieSlice.reducer;

const {} = movieSlice.actions;

export const movieAction = {};

export default movieReducer;
