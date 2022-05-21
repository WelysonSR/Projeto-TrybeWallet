import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletSum } from '../actions';

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
      <section>
        {
          expenses && (
            <>
              <div>TrybeWallet</div>
              <p data-testid="email-field">{emailUser}</p>
              <p data-testid="total-field">{ this.print()}</p>
              <p data-testid="header-currency-field">BRL</p>
            </>
          )
        }
      </section>
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
