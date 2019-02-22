import { SET_USER_ID, SET_USER_DATA, GUEST_SET, GUEST_CLEAR } from '../actions/type';
import { SET_USER_NAME } from '../actions/type';
import { SET_USER_EMAIL } from '../actions/type';
import { SET_USER_PASS } from '../actions/type';
import { SET_USER_TYPE } from '../actions/type';

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
    type : "none",
}

// テストユーザー（初期状態）
const INITIAL_STATE_TEST_USER = {
    id : '6ba7fead-df7e-4aa2-afd8-9c3ac3a77b1a',
    name : 'ゆるゆる',
    email : 's15178@tokyo.kosen-ac.jp',
    pass : '65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5',
    guest : false,
    type : "register",
}

const user_reducer = (state = INITIAL_STATE_TEST_USER, action) => {
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
        case SET_USER_TYPE:
            return { ...state,type:action.utype}
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