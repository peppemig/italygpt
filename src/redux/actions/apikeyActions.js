import { setLoading, setError, setApiKey } from '../slices/apikey'

export const addApiKey = (apikeytoadd) => (dispatch) => {
    dispatch(setLoading(true))
    try {
        const apikey = apikeytoadd
        dispatch(setApiKey(apikey))
    } catch (error) {
        dispatch(setError(error))
    }
}