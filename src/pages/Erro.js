import React from 'react';
import PropTypes from 'prop-types';
import './Erro.css';

class Error extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <section className="section-erro">
        <h1 className="h1-erro">Pagina não encontrada</h1>
        <input
          type="button"
          value="Login"
          className="btn btn-primary"
          onClick={ () => history.push('/') }
        />
      </section>
    );
  }
}

Error.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Error;
