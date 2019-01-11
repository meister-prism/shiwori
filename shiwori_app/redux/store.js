import { createStore } from 'redux';
import {persistStore,persistReducer}from "redux-persist";
import rootReducer from './reducers/index';
import storage from "redux-persist/lib/storage";

// export const store = createStore(rootReducer);

const config = {
    key: 'root',
    storage
};

const pReducer = persistReducer(config,rootReducer);
export const store = createStore(pReducer);
export const persistor = persistStore(store);