import { configureStore } from '@reduxjs/toolkit'
import reloadSlice from './reloadSlice'
const store = configureStore({
    reducer: {
        reload: reloadSlice
    }
})

export default store