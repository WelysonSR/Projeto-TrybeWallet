import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { label, labelName, selectValue, value, funcao } = this.props;
    return (
      <label htmlFor={ label } className="form-label">
        { labelName }
        <select
          name={ label }
          id={ label }
          value={ value }
          onChange={ funcao }
          className="form-select"
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
