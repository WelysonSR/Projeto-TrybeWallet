import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletSave, walletSum } from '../actions';
import fetchCotacao from '../func/fetch';
import Select from './forms/Select';
import './FormDespesa.css';

const alimentacao = 'Alimentação';

class FormDespesa extends React.Component {
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.sumValue = this.sumValue.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  sumValue(coin) {
    const { getSum, sumWallet } = this.props;
    const { currency, value } = this.state;
    const key = coin[currency];
    const number = 10;
    if (currency !== 'BRL') {
      const mult = Number(value) * Number(key.ask);
      const som = Number(getSum) + mult;
      const decimal = number ** 2; // https://pt.stackoverflow.com/questions/252246/decimais-sem-arredondar-em-javascript
      sumWallet(Math.floor(som * decimal) / decimal);
    }
  }

  async addItem() {
    const { getExpenses, saveWallet } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const coin = await fetchCotacao();
    const item = {
      id: (getExpenses <= 0) ? 0 : getExpenses.length,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: coin,
    };
    this.sumValue(coin, value, currency);
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      description: '',
    });
    saveWallet(item);
  }

  render() {
    const { value, currency, method, tag,
      description, metodoPagamento, tagValue } = this.state;
    const { walletCoin } = this.props;
    return (
      <form className="form-description">
        <label htmlFor="valor" className="form-label">
          Valor:
          <input
            type="number"
            value={ value }
            name="value"
            id="value"
            className="form-control"
            onChange={ this.handleChange }
          />
        </label>
        <Select
          value={ currency }
          label="currency"
          labelName="Moeda:"
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
        <label htmlFor="description" className="form-label">
          Description
          <input
            type="text"
            value={ description }
            name="description"
            className="form-control description"
            onChange={ this.handleChange }
          />
        </label>
        <input
          type="button"
          value="Adicionar despesa"
          className="btn btn-primary btn-add"
          onClick={ this.addItem }
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  walletCoin: state.wallet.currencies,
  getExpenses: state.wallet.expenses,
  getSum: state.wallet.sum,
});

const mapDispatchToProps = (dispatch) => ({
  saveWallet: (state) => dispatch(walletSave(state)),
  sumWallet: (state) => dispatch(walletSum(state)),
});

FormDespesa.propTypes = {
  walletCoin: PropTypes.string,
  getExpenses: PropTypes.array,
  getSum: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesa);
