import * as Actions from '../../utils/stateChanges';

describe('State action should', () => {
  test('change input correctly', () => {
    const e = {
      target: {
        name: 'name',
        value: 'Tom'
      }
    };
    const update = Actions.changeInput(e);
    expect(update()).toEqual({ name: 'Tom' });
  });

  test('get errors correctly', () => {
    const errors = {
      email: 'Email required',
      password: 'Password required'
    };

    const getErrors = Actions.getErrors(errors);
    expect(getErrors()).toEqual({ errors });
  });
});
