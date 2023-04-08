import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    loading: false,
    error: null,
    conversationid: ''
}

const updateLocalStorage = (conversationid) => {
    localStorage.setItem('conversationid', conversationid)
}

export const conversationidSlice = createSlice({
    name: 'conversationid',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        setConversationid: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.conversationid = payload;
            updateLocalStorage(state.conversationid)
        },
        setError: (state, {payload}) => {
            state.error = payload;
            state.loading = false
        }
    }
})

export const { setLoading, setConversationid, setError } = conversationidSlice.actions
export default conversationidSlice.reducer;

export const conversationdidSelector = (state) => state.conversationid