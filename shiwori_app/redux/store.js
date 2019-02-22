import { createStore } from 'redux';
import {AsyncStorage}from 'react-native';
import {persistStore,persistReducer}from "redux-persist";
import rootReducer from './reducers/index';
import storage from "redux-persist/lib/storage";


const config = {
    key: 'root',
    version:0,
    storage
};
const pReducer = persistReducer(config,rootReducer);
const _store = () =>{
    createStore(rootReducer);
}

// データを保存したくないときはこれ
export const store = createStore(rootReducer);
//  データを保存したいときはこれ
// export const store = createStore(pReducer);

export const persistor = persistStore(store);
