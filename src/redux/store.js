import { combineReducers, configureStore } from "@reduxjs/toolkit"
import apikey from "./slices/apikey"
import conversation from "./slices/conversation"

const reducer = combineReducers({
    apikey,
    conversation
})

export default configureStore({
    reducer
})

