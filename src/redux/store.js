import { configureStore } from '@reduxjs/toolkit';
import reloadSlice from './reloadSlice';
import modalReducer from './modalSlice';
const store =  configureStore({
    reducer: {
        reload: reloadSlice,
        modal: modalReducer
    }
})

export default store