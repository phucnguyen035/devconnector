import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

const setCurrentUser = decodedToken => ({
  type: 'SET_CURRENT_USER',
  payload: decodedToken
});

const createUser = (userData, history) => async (dispatch) => {
  try {
    await axios.post('/api/users/signup', userData);

    history.push('/signin');
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data
    });
  }
};

const loginUser = (userData, history) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users/signin', userData);
    const { token } = data;
    const decoded = jwtDecode(token);

    // Save token to local storage and set authorizaion
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);

    // Set current user
    dispatch(setCurrentUser(decoded));
    history.push('/dashboard');
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data
    });
  }
};

const logoutUser = () => (dispatch) => {
  localStorage.clear();
  setAuthToken();

  dispatch({
    type: 'LOGOUT_USER'
  });
};

export { createUser, loginUser, logoutUser, setCurrentUser };
