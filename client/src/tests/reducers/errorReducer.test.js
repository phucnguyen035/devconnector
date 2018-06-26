import errorReducer from '../../reducers/errorReducer';

describe('Error reducer', () => {
  // Test default expenses values
  test('should set up default profile values', () => {
    const state = errorReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({});
  });

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
