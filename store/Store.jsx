import {configureStore} from '@reduxjs/toolkit';
// import todoReducer from './todoSlice';
import userReducer from './UserSlice'
import todoReducer from './TodoSlice'
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    };
const rootReducer = combineReducers({
     user : userReducer,
        todo : todoReducer,
    // todoReducer,
    });
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    });

export default store;



