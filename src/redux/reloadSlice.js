import { createSlice } from "@reduxjs/toolkit";

export const reloadSlice = createSlice({
    name: "reload",
    initialState: { reloadState: false },
    reducers: {
        reload: (state) => {
            state.reloadState = !state.reloadState
        },
    },
});

export const { reload } = reloadSlice.actions

export default reloadSlice.reducer