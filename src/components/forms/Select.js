import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { label, labelName, selectValue, value, funcao, testid } = this.props;
    return (
      <label htmlFor={ label }>
        { labelName }
        <select
          name={ label }
          id={ label }
          value={ value }
          onChange={ funcao }
          data-testid={ testid }
        >
          {
            (selectValue.length > 0) && (
              selectValue.map((element, i) => (
                <option key={ i } value={ element }>{element}</option>
              ))
            )
          }
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  labelName: PropTypes.string,
  selectValue: PropTypes.array,
}.isRequired;

export default Select;
