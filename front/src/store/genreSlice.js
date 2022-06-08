import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LOADING, REJECTED, RESOLVED} from "../constants";
import {movieService} from "../servcies";

export const getAllGenres = createAsyncThunk(
    'genreSlice/getAllGenres',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const data = await movieService.getAllDiscoverGenre();
            return {allGenres: data};
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const genreSlice = createSlice({
    name: 'genreSlice',
    initialState: {
        genres: [],
        errors: null,
        status: null,
        chosenGenresId: [],
        chosenGenres: [],
    },
    reducers: {
        setChosenGenre: (state, action) => {
            const {id} = action.payload.chosenGenre;
            state.chosenGenresId.push(`${id},`);
            state.genres = state.genres.filter(genre => genre.id !== id);
            state.chosenGenres.push(action.payload.chosenGenre);
        },
        putChosenGenre: (state, action) => {
            const {id} = action.payload.genre;
            state.chosenGenres = state.chosenGenres.filter(genre => genre.id !== id);
            state.chosenGenresId = state.chosenGenresId.filter(element => element !== `${id},`);
            state.genres.push(action.payload.genre);
        }
    },
    extraReducers: {
        [getAllGenres.pending]: (state, action) => {
            state.status = LOADING;
            state.errors = null;
        },
        [getAllGenres.fulfilled]: (state, action) => {
            state.status = RESOLVED;
            state.genres = action.payload.allGenres.genres;
            state.errors = null;
        },
        [getAllGenres.rejected]: (state, action) => {
            state.status = REJECTED;
            state.errors = action.payload;
        },
    }
});
const genreReducer = genreSlice.reducer;

const {setChosenGenre,putChosenGenre} = genreSlice.actions;

export const genreAction = {setChosenGenre,putChosenGenre};

export default genreReducer;
