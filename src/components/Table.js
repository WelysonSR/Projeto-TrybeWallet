import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  getExpenses: state.wallet.expenses,
});

Table.propTypes = {
  getExpenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
