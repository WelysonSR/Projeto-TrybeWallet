import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from './forms/Select';
import Textarea from './forms/Textarea';

class FormDespesa extends React.Component {
  constructor() {
    super();
    this.state = {
      metodoPagamento: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagValue: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      valor: '',
      moeda: '',
      metodo: '',
      tag: '',
      descricao: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  addItem() {}

  render() {
    const { valor, moeda, metodo, tag,
      descricao, metodoPagamento, tagValue } = this.state;
    const { walletCoin } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            type="number"
            value={ valor }
            name="valor"
            id="valor"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <Select
          value={ moeda }
          label="moeda"
          labelName="Moeda:"
          selectValue={ walletCoin }
          funcao={ this.handleChange }
        />
        <Select
          value={ metodo }
          label="metodo"
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
        <Textarea descricao={ descricao } funcao={ this.handleChange } />
        <input type="button" value="Adicionar despesa" onClick={ this.addItem } />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  walletCoin: state.wallet.currencies,
});

FormDespesa.propTypes = {
  walletCoin: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(FormDespesa);
