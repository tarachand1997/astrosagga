import * as types from '../types'
const initialState = {
    loginData: {}
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGINDATA:
            return { ...state, loginData: action.payload }
        default:
            return state
    }
}
export default loginReducer;