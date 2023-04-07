import { combineReducers, configureStore } from "@reduxjs/toolkit"
import apikey from "./slices/apikey"

const reducer = combineReducers({
    apikey
})

export default configureStore({
    reducer
})

