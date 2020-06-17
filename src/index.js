import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const globalState = {
  searchValue: ''
}

// Reducer
const rootReducer = (state = globalState, action, param) => {
  if (action.type === "SEARCH_VALUE") {
    // console.log(action.value)
    return {
      ...state,
      searchValue: action.value
    }
  }
  return state
}

// store
const storeRedux = createStore(rootReducer)

ReactDOM.render(
  <Provider store={storeRedux} >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
