import { createStore } from 'redux';
import {AsyncStorage}from 'react-native';
import {persistStore,persistReducer}from "redux-persist";
import rootReducer from './reducers/index';
import storage from "redux-persist/lib/storage";

// export const store = createStore(rootReducer);
const config = {
    key: 'root',
    version:0,
    storage
};
const pReducer = persistReducer(config,rootReducer);
const _store = () =>{
    createStore(rootReducer);
}
export const store = createStore(pReducer);

export const persistor = persistStore(store);
