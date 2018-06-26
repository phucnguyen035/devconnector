import {
  setProfileLoading,
  getCurrentProfile,
  clearUserProfile
} from '../../actions/profileActions';

describe('Profile actions', () => {
  test('Should set up loading action creator', () => {
    const action = setProfileLoading();

    expect(action).toEqual({
      type: 'PROFILE_LOADING'
    });
  });
});
