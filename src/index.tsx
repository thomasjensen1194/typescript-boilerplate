import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import apolloClient from './apolloClient';
import { ApolloProvider } from '@apollo/react-hooks';
import rootReducer from 'redux/reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'production' ? false : true
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
