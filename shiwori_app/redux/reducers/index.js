// index.js
import { combineReducers } from 'redux';
import user_reducer from './user_data';
import bookdata from './book_data';

const shiworiStore = combineReducers({
    user : user_reducer,
    bookdata : bookdata
})

export default shiworiStore;