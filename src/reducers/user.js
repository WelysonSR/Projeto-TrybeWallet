const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'NEW_USER':
    return {
      ...state,
      email: action.state,
    };
  default:
    return state;
  }
}

export default userReducer;
