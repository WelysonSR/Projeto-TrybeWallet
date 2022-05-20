import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { itemRemove, walletSum } from '../actions';

class Table extends React.Component {
  subtractionValue = (item) => {
    const { getSum, sumWallet } = this.props;
    const multiplication = item.value * item.exchangeRates[item.currency].ask;
    const result = this.decimalPlaces(getSum - multiplication);
    sumWallet(result);
  }

  removeItem = (item) => {
    const { getExpenses, removeSelectedItem } = this.props;
    const newItems = getExpenses.filter((selectItem) => selectItem.id !== item.id);
    this.subtractionValue(item);
    removeSelectedItem(newItems);
  }

  render() {
    const { getExpenses } = this.props;
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
        <tbody>
          {
            getExpenses.map((item, i) => (
              <tr key={ i }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{Number(item.value).toFixed(2)}</td>
                <td>
                  {item.exchangeRates[item.currency].name}
                </td>
                <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                <td>
                  {Number(item.value * item.exchangeRates[item.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <input type="button" value="Editar" />
                  <input
                    type="button"
                    value="Deletar"
                    data-testid="delete-btn"
                    onClick={ () => this.removeItem(item) }
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  getExpenses: state.wallet.expenses,
  getSum: state.wallet.sum,
});

const mapDispatchToProps = (dispatch) => ({
  removeSelectedItem: (state) => dispatch(itemRemove(state)),
  sumWallet: (state) => dispatch(walletSum(state)),
});

Table.propTypes = {
  getExpenses: PropTypes.array,
  removeSelectedItem: PropTypes.func,
  sumWallet: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
