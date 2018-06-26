import profileReducer from '../../reducers/profileReducer';

let initialState = {};

describe('Profile reducer', () => {
  beforeEach(() => {
    initialState = {
      profile: null,
      profiles: null,
      loading: false
    };
  });

  // Test default expenses values
  test('should set up default profile values', () => {
    const state = profileReducer(initialState, { type: '@@INIT' });

    expect(state).toEqual({
      profile: null,
      profiles: null,
      loading: false
    });
  });

  test('should set loading', () => {
    const action = {
      type: 'PROFILE_LOADING'
    };

    const state = profileReducer(initialState, action);

    expect(state.loading).toBeTruthy();
  });

  test('should fetch profile', () => {
    const payload = {
      handle: 'phucnguyen'
    };
    const action = {
      type: 'GET_PROFILE',
      payload
    };
    const state = profileReducer(initialState, action);

    expect(state.loading).toBeFalsy();
    expect(state.profile).toEqual(payload);
  });

  test('should clear current profile', () => {
    initialState = {
      profile: 'blah blah blah',
      profiles: null,
      loading: false
    };
    const action = {
      type: 'CLEAR_CURRENT_PROFILE'
    };
    const state = profileReducer(initialState, action);

    expect(state.profile).toBeNull();
  });
});
