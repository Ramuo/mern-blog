import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import AutSliceReducer from './slices/authSlice';
import themeSliceReducer from './slices/themeSlice'


const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AutSliceReducer,
        theme: themeSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;