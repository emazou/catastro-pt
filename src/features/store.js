import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './modalSlice';
import prediosAPI from './prediosAPI';
import propietariosAPI from './propietariosAPI';
import construccionesAPI from './construccionesAPI';
import terrenosAPI from './terrenosAPI';
const store = configureStore({
    reducer: {
        [prediosAPI.reducerPath]: prediosAPI.reducer,
        [propietariosAPI.reducerPath]: propietariosAPI.reducer,
        [construccionesAPI.reducerPath]: construccionesAPI.reducer,
        [terrenosAPI.reducerPath]: terrenosAPI.reducer,
        modal: modalSlice,
    }
})

export default store