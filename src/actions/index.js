const userAction = (state) => ({ type: 'NEW_USER', state });
const walletAction = (state) => ({ type: 'NEW_WALLTMOEDA', state });
const walletSave = (state) => ({ type: 'NEW_WALLTSAVE', state });
const walletSum = (state) => ({ type: 'NEW_WALLTSUM', state });
const itemRemove = (state) => ({ type: 'REMOVE_ITEM', state });
const editItem = (state) => ({ type: 'EDIT_ITEM', state });
const updateItem = (state) => ({ type: 'UPDATE_ITEM', state });

function fetchMoeda() {
  return async (dispatch) => {
    const moedas = await fetch('https://economia.awesomeapi.com.br/json/all');
    const respons = await moedas.json();
    const data = Object.entries(respons);
    const coinData = data.filter((coin) => coin[0] !== 'USDT')
      .map((coin) => coin[1].code);
    dispatch(walletAction(coinData));
  };
}

export { userAction, walletAction, walletSave,
  walletSum, fetchMoeda, itemRemove, editItem, updateItem };
