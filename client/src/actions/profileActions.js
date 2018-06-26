import axios from 'axios';

const setProfileLoading = () => ({
  type: 'PROFILE_LOADING'
});

const getCurrentProfile = () => async (dispatch) => {
  dispatch(setProfileLoading());

  try {
    const { data } = await axios.get('/api/profile');

    dispatch({
      type: 'GET_PROFILE',
      payload: data
    });
  } catch (error) {
    dispatch({
      type: 'GET_PROFILE',
      payload: {}
    });
  }
};

const clearUserProfile = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_CURRENT_PROFILE'
  });
};

export { setProfileLoading, getCurrentProfile, clearUserProfile };
