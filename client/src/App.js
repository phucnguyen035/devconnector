import React from 'react';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import AppRouter, { history } from './routes';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';

// Check for token for every visit
if (localStorage.jwtToken) {
  const { jwtToken: token } = localStorage;
  // Set auth token
  setAuthToken(token);
  // Decode token to get user info and exp
  const decoded = jwtDecode(token);

  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    history.push('/');
  }
}

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
