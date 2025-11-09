import { configureStore } from 'redux';
import reducer from './task'; // This reducer file code is written below

const store = configureStore(reducer);

export default store;