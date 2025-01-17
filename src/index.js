import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './modules'
import { setUserId } from './modules/auth';

const store=createStore(rootReducer,composeWithDevTools());

function loadUser(){
  try{
    const user=sessionStorage.getItem('user');
    if(!user){
      return;
    }
    store.dispatch(setUserId(user));
  }catch(e){
    console.log('sessionstorage err');
  }
}
loadUser();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
