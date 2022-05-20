import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
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

Header.propTypes = {
  emailUser: PropTypes.string,
  getSum: PropTypes.number,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
