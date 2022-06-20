import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h1>Pagina não encontrada</h1>
        <input
          type="button"
          value="Voltar"
          onClick={ () => history.push('/') }
        />
      </>
    );
  }
}

Error.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Error;
