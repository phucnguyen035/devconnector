import axios from 'axios';

export const setProfileLoading = () => ({
  type: 'PROFILE_LOADING'
});

export const getCurrentProfile = () => async (dispatch) => {
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

export const createProfile = (profileData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile/', profileData);

    history.push('/dashboard');
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data
    });
  }
};

// Delete account AND profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone')) {
    try {
      await axios.delete('/api/profile');

      dispatch({
        type: 'SET_CURRENT_USER',
        payload: {}
      });
    } catch (error) {
      dispatch({
        type: 'GET_ERRORS',
        payload: error.response.data
      });
    }
  }
};

export const clearUserProfile = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_CURRENT_PROFILE'
  });
};

export const createExperience = (experienceData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile/experience', experienceData);

    history.push('/dashboard');
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data
    });
  }
};

export const createEducation = (educationData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile/education', educationData);

    history.push('/dashboard');
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data
    });
  }
};
