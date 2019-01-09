// index.js
import { combineReducers } from 'redux';
import user_reducer from './user_data';

const shiworiStore = combineReducers({
    user : user_reducer// 作るたびに追加
})

export default shiworiStore;