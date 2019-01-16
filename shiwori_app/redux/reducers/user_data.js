import { SET_USER_ID, SET_USER_DATA, GUEST_SET, GUEST_CLEAR } from '../actions/type';
import { SET_USER_NAME } from '../actions/type';
import { SET_USER_EMAIL } from '../actions/type';
import { SET_USER_PASS } from '../actions/type';

import { CLEAR_USER_ID } from '../actions/type';
import { CLEAR_USER_NAME } from '../actions/type';
import { CLEAR_USER_EMAIL } from '../actions/type';
import { CLEAR_USER_PASS } from '../actions/type';
import { CLEAR_USER_DATA } from '../actions/type';

// 初期状態
const INITIAL_STATE = {
    id : '',
    name : '',
    email : '',
    pass : '',
    guest : false,
}

const user_reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER_ID:
            return { ...state, id: action.id }
        case SET_USER_NAME:
            return { ...state, name: action.name }
        case SET_USER_EMAIL:
            return { ...state, email: action.email }
        case SET_USER_PASS:
            return { ...state, pass: action.pass }
        case SET_USER_DATA:
            return { ...state,  
                        id   : action.id,
                        name : action.name,
                        email: action.email,
                        pass : action.pass }
        case CLEAR_USER_ID:
            return { ...state, id: action.id }
        case CLEAR_USER_NAME:
            return { ...state, name: action.name}
        case CLEAR_USER_EMAIL:
            return { ...state, email: action.email }
        case CLEAR_USER_PASS:
            return { ...state, pass: action.pass }
        case CLEAR_USER_DATA:
            return { ...state,
                        id : action.id,
                        name : action.name,
                        email : action.email,
                        pass  : action.pass}
        case GUEST_SET:
            return {...state, guest : true}
        case GUEST_CLEAR:
            return {...state, guest : false}

        default:
            return state;
    }
}
export default user_reducer;