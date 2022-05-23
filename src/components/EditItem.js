import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editItem, updateItem, walletSum } from '../actions';
import Select from './forms/Select';
import Textarea from './forms/Textarea';

const alimentacao = 'Alimentação';

class EditItem extends React.Component {
  constructor() {
    super();
    this.state = {
      metodoPagamento: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagValue: [alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      description: '',
      id: '',
      exchangeRates: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    const { itemToBeEdited: { item } } = this.props;
    const { value, currency, method, tag, description, id, exchangeRates } = item;
    this.setState({ value, currency, method, tag, description, id, exchangeRates });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  sumValue() {
    const { sumWallet, getExpenses } = this.props;
    const result = getExpenses.reduce((acc, expense) => {
      const multiplication = expense.exchangeRates[expense.currency].ask * expense.value;
      const resultacc = acc + multiplication;
      return resultacc;
    }, 0);
    sumWallet(Number(result).toFixed(2));
  }

  edit() {
    const { itemEdit, getExpenses, itemUpdate, editExpense } = this.props;
    const { id, value, currency, method, tag, description, exchangeRates } = this.state;
    const reset = {
      edit: false,
      item: {},
    };
    const item = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    getExpenses[id] = item;
    itemUpdate(getExpenses);
    editExpense();
    itemEdit(reset);
    this.sumValue();
  }

  render() {
    const { value, currency, method, tag,
      description, metodoPagamento, tagValue } = this.state;
    const { walletCoin } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            type="number"
            value={ value }
            name="value"
            id="value"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <Select
          value={ currency }
          label="currency"
          labelName="Moeda:"
          testid="currency-input"
          selectValue={ walletCoin }
          funcao={ this.handleChange }
        />
        <Select
          value={ method }
          label="method"
          labelName="Método de pagamento:"
          testid="method-input"
          selectValue={ metodoPagamento }
          funcao={ this.handleChange }
        />
        <Select
          value={ tag }
          label="tag"
          labelName="Tag:"
          testid="tag-input"
          selectValue={ tagValue }
          funcao={ this.handleChange }
        />
        <Textarea descricao={ description } funcao={ this.handleChange } />
        <input
          type="button"
          value="Editar despesa"
          onClick={ this.edit }
          data-testid="edit-btn"
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  getExpenses: state.wallet.expenses,
  walletCoin: state.wallet.currencies,
  itemToBeEdited: state.wallet.itemEdit,
  getSum: state.wallet.sum,
});

const mapDispatchToProps = (dispatch) => ({
  itemEdit: (state) => dispatch(editItem(state)),
  itemUpdate: (state) => dispatch(updateItem(state)),
  sumWallet: (state) => dispatch(walletSum(state)),
});

EditItem.propTypes = {
  walletCoin: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
