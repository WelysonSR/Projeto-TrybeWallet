const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  sum: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'NEW_WALLTMOEDA':
    return { ...state, currencies: action.state };
  case 'NEW_WALLTSAVE':
    return { ...state, expenses: [...state.expenses, action.state] };
  case 'NEW_WALLTSUM':
    return { ...state, sum: action.state };
  default:
    return state;
  }
}

export default walletReducer;
