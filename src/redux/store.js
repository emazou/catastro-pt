import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './modalSlice';
import editSlice from './editSlice';
import prediosAPI from './prediosAPI';
const store = configureStore({
    reducer: {
        [prediosAPI.reducerPath]: prediosAPI.reducer,
        modal: modalSlice,
        edit: editSlice
    }
})

export default store