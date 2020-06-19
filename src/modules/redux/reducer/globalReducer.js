import ActionType from './globalActionType'

const globalState = {
    searchValue: ''
}

// Reducer
const rootReducer = (state = globalState, action, param) => {
    if (action.type === ActionType.SEARCH_VALUE) {
        // console.log(action.value)
        return {
            ...state,
            searchValue: action.value
        }
    }
    return state
}

export default rootReducer