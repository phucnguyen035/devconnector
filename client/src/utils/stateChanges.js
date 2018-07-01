export const changeInput = (e) => {
  const { name, value } = e.target;

  return () => ({ [name]: value });
};

export const getErrors = errors => () => ({ errors });

export const toggleDisplaySocial = state => ({ displaySocial: !state.displaySocial });

export const toggleCheck = state => ({
  disabled: !state.disabled,
  current: !state.current
});
