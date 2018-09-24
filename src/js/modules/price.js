import numeral from 'numeral';
import "numeral/locales/pt-br";


export default class Price {
  constructor(product){
    numeral.locale('pt-br');
  }

  convert(number) {
    console.log(number);
  }


  display({ name }) {
    console.log(name)
  }

  list(number){
    const listPrice = `<span class="price__list">R$ 5,99 no boleto</span>`
    return listPrice
  }
  best(number){
    number = number * 0.01;
    const bestPrice = `<span class="price__list">${numeral(number).format('$ 0,0.00')} no boleto</span>`
    return bestPrice
  }

  installments(number, installment) {
    number = number * 0.01;
    const installments = `<span class="price__instament"> ${installment}x ${numeral(number).format('$ 0,0.00')} sem juros</span>`
    return installments
  }

  mont(product) {

    const price = `
    <div class="price">
      ${product.listPrice && !product.bestPrice ? this.list(product.listPrice): ''}
      ${product.bestPrice ? this.best(product.bestPrice): ''}
      ${product.installments > 1 ? this.installments(product.installmentsValue, product.installments): ''}
    </div>
    `
    return price;
  }
}
