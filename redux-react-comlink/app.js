import React from 'react';
import ReactDOM from 'react-dom';
import { wrap } from 'comlink';
import { Provider, useDispatch, useSelector } from 'react-redux';
import remoteStoreWrapper from './remoStoreWrapper';

import { createStore } from 'redux';
import reducer from './reducer';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  return (
    <div>
      Current count: {count}
      <button type="button" onClick={() => dispatch({ type: 'increment' })}>
        +1
      </button>
      <button type="button" onClick={() => dispatch({ type: 'decrement' })}>
        -1
      </button>
    </div>
  );
};
const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Counter />
      <Counter />
      <Counter />
    </Provider>
  );
};

const withOutWebWorker = async () => {
  const store = createStore(reducer);
  ReactDOM.render(<App store={store} />, document.getElementById('app'));
};

const withWebWorker = async () => {
  const worker = new Worker('./store.worker.js');
  const remoteStore = wrap(worker);
  const store = await remoteStoreWrapper(remoteStore);

  ReactDOM.render(<App store={store} />, document.getElementById('app2'));
};

withWebWorker();
withOutWebWorker();
