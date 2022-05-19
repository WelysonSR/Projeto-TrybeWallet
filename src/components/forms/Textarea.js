import React from 'react';
import PropTypes from 'prop-types';

class Textarea extends React.Component {
  render() {
    const { descricao, funcao } = this.props;
    return (
      <label htmlFor="descricao">
        Descrição:
        <textarea
          name="descricao"
          id="descricao"
          value={ descricao }
          onChange={ funcao }
          data-testid="description-input"
        />
      </label>
    );
  }
}

Textarea.propTypes = {
  descricao: PropTypes.string,
  funcao: PropTypes.func,
}.isRequired;

export default Textarea;
