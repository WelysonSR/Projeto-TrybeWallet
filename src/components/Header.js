import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { emailUser } = this.props;
    return (
      <section>
        <div>TrybeWallet</div>
        <p data-testid="email-field">{emailUser}</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
});

Header.propTypes = {
  emailUser: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
