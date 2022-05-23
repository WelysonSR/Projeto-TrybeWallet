const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  sum: 0,
  itemEdit: {
    edit: false,
    item: {},
  },
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'NEW_WALLTMOEDA':
    return { ...state, currencies: action.state };
  case 'NEW_WALLTSAVE':
    return { ...state, expenses: [...state.expenses, action.state] };
  case 'NEW_WALLTSUM':
    return { ...state, sum: action.state };
  case 'REMOVE_ITEM':
    return { ...state, expenses: action.state };
  case 'EDIT_ITEM':
    return { ...state, itemEdit: action.state };
  case 'UPDATE_ITEM':
    return { ...state, expenses: [...action.state] };
  default:
    return state;
  }
}

export default walletReducer;
