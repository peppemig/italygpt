import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    loading: false,
    error: null,
    apikey: ''
}

const updateLocalStorage = (apikey) => {
    localStorage.setItem('apikey', apikey)
}

export const apikeySlice = createSlice({
    name: 'apikey',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        setApiKey: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.apikey = payload;
            updateLocalStorage(state.apikey)
        },
        setError: (state, {payload}) => {
            state.error = payload;
            state.loading = false
        }
    }
})

export const { setLoading, setError, setApiKey } = apikeySlice.actions;
export default apikeySlice.reducer;

export const apiKeySelector = (state) => state.apikey

