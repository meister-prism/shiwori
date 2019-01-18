// index.js
import { combineReducers } from 'redux';
import userdata from './user_data';
import bookdata from './book_data';
import {CLEAR_STATE} from '../actions/type';

const shiworiReducer = combineReducers({
    bookdata : bookdata,
    user : userdata,
})

const rootReducer = (state, action) => {
    if (action.type === CLEAR_STATE) {
        state = undefined;
    }
    return shiworiReducer(state, action);
};

export default rootReducer;