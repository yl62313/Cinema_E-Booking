import { configureStore } from "@reduxjs/toolkit";
import loadersReducer from "./loader_reducer";
import usersReducer from "./user_reducer"

const store = configureStore({
    reducer: {
        loaders: loadersReducer,
        users: usersReducer,
    }
})

export default store;