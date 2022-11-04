
import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
    name: "edit",
    initialState: {
        predio: {}
    },
    reducers: {
        editPredio: (state, action) => {
            state.predio = action.payload;
        },
    },
});

export const { editPredio } = editSlice.actions

export default editSlice.reducer