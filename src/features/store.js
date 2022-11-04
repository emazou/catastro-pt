import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './modalSlice';
import editSlice from './editSlice';
import prediosAPI from './prediosAPI';
import propietariosAPI from './propietariosAPI';
import construccionesAPI from './construccionesAPI';
const store = configureStore({
    reducer: {
        [prediosAPI.reducerPath]: prediosAPI.reducer,
        [propietariosAPI.reducerPath]: propietariosAPI.reducer,
        [construccionesAPI.reducerPath]: construccionesAPI.reducer,
        modal: modalSlice,
        edit: editSlice
    }
})

export default store