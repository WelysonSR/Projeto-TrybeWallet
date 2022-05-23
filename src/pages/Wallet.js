import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoeda } from '../actions';
import Header from '../components/Header';
import FormDespesa from '../components/FormDespesa';
import Table from '../components/Table';
import EditItem from '../components/EditItem';

class Wallet extends React.Component {
  state = { edit: false }

  componentDidMount() {
    const { walletCoin } = this.props;
    walletCoin();
  }

  editExpense = (action) => {
    if (action === 'editar') {
      this.setState({ edit: true });
    } else {
      this.setState({ edit: false });
    }
  }

  render() {
    const { edit } = this.state;
    return (
      <section>
        <Header />
        {
          edit ? (
            <EditItem editExpense={ this.editExpense } />
          ) : (
            <FormDespesa />
          )
        }
        <Table editExpense={ this.editExpense } />
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
