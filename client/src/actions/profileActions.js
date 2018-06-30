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

export const getProfileByHandle = handle => async (dispatch) => {
  dispatch(setProfileLoading());

  try {
    const { data } = await axios.get(`/api/profile/handle/${handle}`);

    dispatch({
      type: 'GET_PROFILE',
      payload: data
    });
  } catch (error) {
    dispatch({
      type: 'GET_PROFILE',
      payload: null
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

export const deleteAccount = () => async (dispatch) => {
  // Delete account AND profile
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

export const deleteExperience = expID => async (dispatch) => {
  try {
    const result = await axios.delete(`/api/profile/experience/${expID}`);
    dispatch({
      type: 'GET_PROFILE',
      payload: result.data
    });
  } catch (error) {
    throw error;
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

export const deleteEducation = eduID => async (dispatch) => {
  try {
    const result = await axios.delete(`/api/profile/education/${eduID}`);

    dispatch({
      type: 'GET_PROFILE',
      payload: result.data
    });
  } catch (error) {
    throw error;
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch(setProfileLoading());

  try {
    const results = await axios.get('/api/profile/all');

    dispatch({
      type: 'GET_PROFILES',
      payload: results.data
    });
  } catch (error) {
    dispatch({
      type: 'GET_PROFILES',
      payload: null
    });
  }
};
