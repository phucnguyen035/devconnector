import axios from 'axios';

export const setPostLoading = () => ({
  type: 'POST_LOADING'
});

export const clearErrors = () => ({
  type: 'CLEAR_ERRORS'
});

export const getPosts = () => async (dispatch) => {
  dispatch(setPostLoading());

  try {
    const result = await axios.get('/api/posts/');

    dispatch({
      type: 'GET_ALL_POSTS',
      payload: result.data
    });
  } catch (error) {
    dispatch({
      type: 'GET_ALL_POSTS',
      payload: []
    });
  }
};

export const getPost = postID => async (dispatch) => {
  dispatch(setPostLoading());

  try {
    const result = await axios.get(`/api/posts/${postID}`);

    dispatch({
      type: 'GET_POST',
      payload: result.data
    });
  } catch (error) {
    dispatch({
      type: 'GET_POST',
      payload: null
    });
  }
};

export const addPost = postData => async (dispatch) => {
  dispatch(clearErrors());

  try {
    const result = await axios.post('/api/posts', postData);
    dispatch({
      type: 'ADD_POST',
      payload: result.data
    });
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data
    });
  }
};

export const deletePost = postID => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postID}`);

    dispatch({
      type: 'DELETE_POST',
      payload: postID
    });
  } catch (error) {
    throw error;
  }
};

export const addLike = postID => async (dispatch) => {
  try {
    await axios.post(`/api/posts/like/${postID}`);

    dispatch(getPosts());
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data
    });
  }
};

export const removeLike = postID => async (dispatch) => {
  try {
    await axios.post(`/api/posts/unlike/${postID}`);

    await dispatch(getPosts());
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data
    });
  }
};

export const addComment = (commentData, postId) => async (dispatch) => {
  dispatch(clearErrors());

  try {
    const result = await axios.post(`/api/posts/comment/${postId}`, commentData);

    dispatch({
      type: 'GET_POST',
      payload: result.data
    });
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const result = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: 'GET_POST',
      payload: result.data
    });
  } catch (error) {
    throw error;
  }
};
