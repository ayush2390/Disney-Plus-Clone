import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import useReducer  from "../features/user/useSlice";
import movieReducer from '../features/movie/movieSlice'

export default configureStore({
    reducer: {
        user: useReducer,
        movie: movieReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
})