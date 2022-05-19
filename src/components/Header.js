import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { emailUser, getSum } = this.props;
    return (
      <section>
        <div>TrybeWallet</div>
        <p data-testid="email-field">{emailUser}</p>
        <p data-testid="total-field">{getSum.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  getSum: state.wallet.sum,
});

Header.propTypes = {
  emailUser: PropTypes.string,
  getSum: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
