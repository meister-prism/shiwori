// index.js
import { combineReducers } from 'redux';
import userdata from './user_data';
import bookdata from './book_data';

const shiworiStore = combineReducers({
    bookdata : bookdata,
    user : userdata,
})

export default shiworiStore;