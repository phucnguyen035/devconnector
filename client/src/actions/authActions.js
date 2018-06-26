import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

const setCurrentUser = decodedToken => ({
  type: 'SET_CURRENT_USER',
  payload: decodedToken
});

const createUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/signup', userData)
    .then(result => history.push('/signin'))
    .catch(err => dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    }));
};
const loginUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/signin', userData)
    .then((result) => {
      // Save token to local storage
      const { token } = result.data;
      const decoded = jwtDecode(token);

      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push('/dashboard');
    })
    .catch(err => dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    }));
};
const logoutUser = () => (dispatch) => {
  localStorage.clear();
  setAuthToken();

  dispatch({
    type: 'LOGOUT_USER'
  });
};

export { createUser, loginUser, logoutUser, setCurrentUser };
