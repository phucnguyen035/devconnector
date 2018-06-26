const changeInput = e => () => ({ [e.target.name]: e.target.value });
const getErrors = errors => () => ({ errors });

export { changeInput, getErrors };
