import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {movieService} from "../servcies";
import {LOADING, REJECTED, RESOLVED} from "../constants";

export const getAllMovies = createAsyncThunk(
    'authSlice/getAllMovies',
    async ({page,genreForURL}, {dispatch, rejectWithValue}) => {
        try {
            const data = await movieService.getAllDiscoverMovie(page,genreForURL);
            return {movies: data};
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getFilteredMovies = createAsyncThunk(
    'authSlice/getFilteredMovies',
    async ({page,searchData}, {dispatch, rejectWithValue}) => {
        try {
            const data = await movieService.getFilteredMovie(page,searchData);
            return {filteredMovies: data};
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
        searchData: '',
        filteredMovies: [],
    },
    reducers: {
        filterMovies: (state, action) => {
            state.searchData = action.payload.searchData.title;
        }
    },
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
            state.video = action.payload.video.results[0]?.key;
            state.errors = null;
        },
        [getVideo.rejected]: (state, action) => {
            state.status = REJECTED;
            state.errors = action.payload;
        },

        [getFilteredMovies.pending]: (state, action) => {
            state.status = LOADING;
            state.errors = null;
        },
        [getFilteredMovies.fulfilled]: (state, action) => {
            state.status = RESOLVED;
            state.filteredMovies = action.payload.filteredMovies.results;
            state.errors = null;
        },
        [getFilteredMovies.rejected]: (state, action) => {
            state.status = REJECTED;
            state.errors = action.payload;
        },
    },
});

const movieReducer = movieSlice.reducer;

const {filterMovies} = movieSlice.actions;

export const movieAction = {filterMovies};

export default movieReducer;
