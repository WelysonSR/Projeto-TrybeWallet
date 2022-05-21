import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { itemRemove, walletSum, editItem } from '../actions';

class Table extends React.Component {
  subtractionValue = (item) => {
    const { getSum, sumWallet } = this.props;
    const multiplication = item.value * item.exchangeRates[item.currency].ask;
    const result = getSum - multiplication;
    sumWallet(Number(result).toFixed(2));
  }

  removeItem = (item) => {
    const { getExpenses, removeSelectedItem } = this.props;
    const newItems = getExpenses.filter((selectItem) => selectItem.id !== item.id);
    this.subtractionValue(item);
    removeSelectedItem(newItems);
  }

  editItem = ({ id }) => {
    const { getExpenses, itemEdit } = this.props;
    const expense = getExpenses.find((selectedExpense) => selectedExpense.id === id);
    const expenseItem = {
      edit: true,
      item: expense,
    };
    itemEdit(expenseItem);
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
            getExpenses.map((item) => (
              <tr key={ item.id }>
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
                  <input
                    type="button"
                    value="Editar"
                    data-testid="edit-btn"
                    onClick={ () => this.editItem(item) }
                  />
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
  itemEdit: (state) => dispatch(editItem(state)),
});

Table.propTypes = {
  getExpenses: PropTypes.array,
  removeSelectedItem: PropTypes.func,
  sumWallet: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
