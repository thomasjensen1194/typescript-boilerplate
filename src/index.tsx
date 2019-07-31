import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from 'redux-starter-kit';
import { Provider } from 'react-redux';
import { client as apolloClient } from './apolloClient';
import { ApolloProvider } from 'react-apollo-hooks';

import authReducer from './redux/reducers/auth';

const store = configureStore({
  reducer: {
    auth: authReducer
  },
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
