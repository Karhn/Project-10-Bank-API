import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux"
import { store } from "./store"
import { login } from './features/userSlice';
import App from './App';
import "./css/main.css";

const token = localStorage.getItem("token")

if (token) {
  store.dispatch(login(token))
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);