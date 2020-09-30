import { expose } from 'comlink';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

expose(store);
