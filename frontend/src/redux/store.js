import { configureStore } from "@reduxjs/toolkit";
import usuarioSlice from './usuarioReducer.js';
import MessageSlice from './messageReducer.js'

const store = configureStore({
    reducer:{
        usuario: usuarioSlice,
        message: MessageSlice,
    }
})

export default store;