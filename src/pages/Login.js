import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      enableButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validiteitButton = this.validiteitButton.bind(this);
    this.buttonLogin = this.buttonLogin.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validiteitButton());
  }

  validiteitButton() {
    const { email, password } = this.state;
    const namber = 6;
    const validiteitEmail = /\S+@\S+\.\S+/; // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    if (password.length >= namber && validiteitEmail.test(email)) {
      this.setState({ enableButton: false });
    } else {
      this.setState({ enableButton: true });
    }
  }

  buttonLogin() {
    const { history: { push }, infoUser } = this.props;
    const { email } = this.state;
    infoUser(email);
    push('/carteira');
  }

  render() {
    const { email, password, enableButton } = this.state;
    return (
      <section>
        <h1>TRYBEWALLET</h1>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            placeholder="Digite seu email"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            placeholder="Digite seu senha"
            onChange={ this.handleChange }
          />
          <input
            type="button"
            value="Entrar"
            disabled={ enableButton }
            onClick={ this.buttonLogin }
          />
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  infoUser: (state) => dispatch(userAction(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
