const userAction = (state) => ({ type: 'NEW_USER', state });
const walletAction = (state) => ({ type: 'NEW_WALLTMOEDA', state });
const walletSave = (state) => ({ type: 'NEW_WALLTSAVE', state });
const walletSum = (state) => ({ type: 'NEW_WALLTSUM', state });

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

// async function fetchCotacao(item) {
//   return async (dispatch) => {
//     const moedas = await fetch('https://economia.awesomeapi.com.br/json/all');
//     const respons = await moedas.json();
//     const newObj = {
//       ...item,
//       exchangeRates: respons,
//     };
//     dispatch(walletSave(newObj));
//   };
// }

export { userAction, walletAction, walletSave, walletSum, fetchMoeda };
