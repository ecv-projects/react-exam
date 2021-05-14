import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import users from './users/index.js';
import articles from '../reducers/articles';

const reducer = combineReducers({
    users,
    articles
})

const store = configureStore({ reducer, devTools: true, middleware: [thunk] });

export default store;
