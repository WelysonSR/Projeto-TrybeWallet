const userAction = (state) => ({ type: 'NEW_USER', state });
const walletAction = (state) => ({ type: 'NEW_WALLTMOEDA', state });
const walletSave = (state) => ({ type: 'NEW_WALLTSAVE', state });

export { userAction, walletAction, walletSave };
