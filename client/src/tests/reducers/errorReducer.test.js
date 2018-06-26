import errorReducer from '../../reducers/errorReducer';

describe('Error reducer', () => {
  test('Should get errors', () => {
    const errors = {
      password: 'Password required'
    };
    const action = {
      type: 'GET_ERRORS',
      payload: errors
    };
    const state = errorReducer({}, action);

    expect(state).toEqual(errors);
  });
});
