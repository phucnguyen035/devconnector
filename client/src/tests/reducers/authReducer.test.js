import authReducer from '../../reducers/authReducer';

describe('Auth Reducer', () => {
  test('Should log user in', () => {
    const initialState = {
      isAuthenticated: false,
      user: {}
    };
    const action = {
      type: 'SET_CURRENT_USER',
      payload: {
        name: 'Tom'
      }
    };
    const state = authReducer(initialState, action);

    expect(state.isAuthenticated).toBeTruthy();
    expect(state.info.name).toBe('Tom');
  });

  test('Should log user out', () => {
    const initialState = {
      isAuthenticated: true,
      payload: {
        name: 'Tom'
      }
    };
    const action = {
      type: 'LOGOUT_USER'
    };
    const state = authReducer(initialState, action);

    expect(state.isAuthenticated).toBeFalsy();
    expect(state.info).toMatchObject({});
  });
});
