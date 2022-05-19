import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoeda } from '../actions';
import Header from '../components/Header';
import FormDespesa from '../components/FormDespesa';

class Wallet extends React.Component {
  componentDidMount() {
    const { walletCoin } = this.props;
    walletCoin();
  }

  render() {
    return (
      <section>
        <Header />
        <FormDespesa />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  walletCoin: () => dispatch(fetchMoeda()),
});

Wallet.propTypes = {
  walletCoin: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Wallet);
