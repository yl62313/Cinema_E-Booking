import {createSlice} from '@reduxjs/toolkit';

const loader_reducer = createSlice({
    name: 'loaders',
    initialState: {
        loading: false,
    },
    reducers: {
        ShowLoading : (state)=>{
            state.loading = true;
        },
        HideLoading : (state)=>{
            state.loading = false;
        }
    }
});

export const {ShowLoading, HideLoading} = loader_reducer.actions;
export default loader_reducer.reducer;