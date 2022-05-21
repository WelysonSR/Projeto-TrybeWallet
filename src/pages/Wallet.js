import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoeda } from '../actions';
import Header from '../components/Header';
import FormDespesa from '../components/FormDespesa';
import Table from '../components/Table';
import EditItem from '../components/EditItem';

class Wallet extends React.Component {
  componentDidMount() {
    const { walletCoin } = this.props;
    walletCoin();
  }

  render() {
    const { item } = this.props;
    return (
      <section>
        <Header />
        {
          item.edit ? (
            <EditItem />
          ) : (
            <FormDespesa />
          )
        }
        <Table />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.wallet.itemEdit,
});

const mapDispatchToProps = (dispatch) => ({
  walletCoin: () => dispatch(fetchMoeda()),
});

Wallet.propTypes = {
  walletCoin: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
