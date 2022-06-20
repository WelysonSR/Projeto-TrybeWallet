import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletSum } from '../actions';
import './Header.css';

class Header extends React.Component {
  componentDidMount() {
    const { expenses, sumWallet } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      const { value, currency, exchangeRates } = expense;
      const { ask } = exchangeRates[currency];
      total += Number(value) * Number(ask);
    });
    sumWallet(total);
  }

  print = () => {
    const { expenses, getSum } = this.props;
    return expenses.length === 0 ? 0 : getSum;
  }

  render() {
    const { emailUser, expenses } = this.props;
    return (
      <header>
        <h1 className="logo">TrybeWallet</h1>
        {
          expenses && (
            <div className="info-user">
              <p className="user-email">{emailUser}</p>
              <p>{ this.print()}</p>
              <p>BRL</p>
            </div>
          )
        }
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  expenses: state.wallet.expenses,
  getSum: state.wallet.sum,
});

const mapDispatchToProps = (dispatch) => ({
  sumWallet: (state) => dispatch(walletSum(state)),
});

Header.propTypes = {
  emailUser: PropTypes.string,
  getSum: PropTypes.number,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
