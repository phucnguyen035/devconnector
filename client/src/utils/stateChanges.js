const changeInput = e => () => ({ [e.target.name]: e.target.value });

const getErrors = errors => () => ({ errors });

const toggleDisplaySocial = state => ({ displaySocial: !state.displaySocial });

const toggleCheck = state => ({
  disabled: !state.disabled,
  current: !state.current
});

export { changeInput, getErrors, toggleDisplaySocial, toggleCheck };
