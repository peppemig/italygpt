import { setLoading, setConversationid, setError } from '../slices/conversation.js'

export const addConversationId = (conversationidtoadd) => (dispatch) => {
    dispatch(setLoading(true))
    try {
        const conversationid = conversationidtoadd
        dispatch(setConversationid(conversationid))
    } catch (error) {
        dispatch(setError(error))
    }
}