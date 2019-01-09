import { createStore } from 'redux';
import {persistStore,persistReducer}from "redux-persist";
import rootReducer from './reducers/index';
import storage from "redux-persist/lib/storage";

export const store = createStore(rootReducer);