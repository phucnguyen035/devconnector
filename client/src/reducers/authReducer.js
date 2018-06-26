import isEmpty from 'lodash.isempty';
// Authentication Reducer

const initialState = {
  isAuthenticated: false,
  info: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        isAuthenticated: !isEmpty(action.payload),
        info: action.payload
      };
    case 'LOGOUT_USER':
      return initialState;
    default:
      return state;
  }
};
