import {createSlice} from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: 'pageSlice',
    initialState:{
        page: 1,
        countOfPages: 500,
    },
    reducers:{
        setPageNumber: (state, action) => {
            state.page = action.payload.page;
        }
    }
});

const pageReducer = pageSlice.reducer;

const {setPageNumber} = pageSlice.actions;

export default pageReducer;
export {setPageNumber};
