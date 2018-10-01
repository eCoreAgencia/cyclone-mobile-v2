class Minicart {
     constructor() {
       $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
         this.update(orderForm)
       })
       vtexjs.checkout.getOrderForm()
     }
     renderItem(item, i) {
       let { quantity } = item
       return `
         <li class="minicart-product" data-item-id="${item.id}">
           <div class="minicart-product__image"><img src="${item.imageUrl}"></div>
           <div class="minicart-product__info">
             <h4 class="minicart-product__name">${item.name}</h4>
             <strong class="minicart-product__price">R$ ${(item.price / 100).formatMoney()}</strong>
           </div>
           
             <button class="minicart-product__remove" type="button" onclick="Minicart.removeItem.apply(null, [${i}])" title="Remover ${item.name} do carrinho">X</button>
         </li>
       `
     }

     renderItems() {
       return this.orderForm.items.map(this.renderItem, this).join('')
     }

     render() {
       let qty = this.getQuantity()
       return `
         <div class="minicart ${qty > 0 ? 'is-not-empty' : ''}">
            <button class="minicart__handle" title="sacola">
                <span class="minicart__count">
                  <svg style="width: 25px; overflow: visible;" enable-background="new 0 0 30.511 30.511" version="1.1" viewBox="0 0 30.511 30.511" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m26.818 19.037l3.607-10.796c0.181-0.519 0.044-0.831-0.102-1.037-0.374-0.527-1.143-0.532-1.292-0.532l-20.385-4e-3 -0.544-2.581c-0.147-0.609-0.581-1.19-1.456-1.19h-5.729c-0.594 0-0.917 0.278-0.917 0.833v1.49c0 0.537 0.322 0.677 0.938 0.677h4.837l3.702 15.717c-0.588 0.623-0.908 1.531-0.908 2.378 0 1.864 1.484 3.582 3.38 3.582 1.79 0 3.132-1.677 3.35-2.677h7.21c0.218 1 1.305 2.717 3.349 2.717 1.863 0 3.378-1.614 3.378-3.475 0-1.851-1.125-3.492-3.359-3.492-0.929 0-2.031 0.5-2.543 1.25h-8.859c-0.643-1-1.521-1.31-2.409-1.345l-0.123-0.655h13.479c1.016 0 1.216-0.37 1.396-0.86zm-0.935 3.791c0.701 0 1.27 0.569 1.27 1.27s-0.569 1.27-1.27 1.27-1.271-0.568-1.271-1.27c1e-3 -0.701 0.57-1.27 1.271-1.27zm-12.678 1.27c0 0.709-0.576 1.286-1.283 1.286-0.709-2e-3 -1.286-0.577-1.286-1.286s0.577-1.286 1.286-1.286c0.707 0 1.283 0.577 1.283 1.286z" fill="#010002"/></svg>
                  <span class="minicart__count-value">${this.printQuantity(qty)}</span>
                </span>
            </button>
            <div class="minicart__overlay"></div>
            <div class="minicart__container">
                <div class="minicart__header">
                    <button class="minicart__handle" title="sacola">
                        <i class="minicart__icon"><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M0 32.47l30.24 29.98 2.62-2.49L4.19 31.23 32.95 2.49 30.22 0 0 29.98v2.49z"/></svg></i>
                        <span class="minicart__title">Minha Compra</span>
                    </button>
                </div>
                <div class="minicart__content">
                    <ul class="minicart__products">
                        ${this.renderItems()}
                    </ul>
                </div>
                <div class="minicart__footer">
                    
                        
                    <div class="minicart__totals">
                        <span class="minicart__totals-text">Total</span>
                        <strong class="minicart__totals-value">${this.getTotal()}</strong>
                    </div>
                    <a class="minicart__checkout" href="/Site/Carrinho.aspx">
                    Finalizar Pedido</a>
                </div>
            </div>
           
         </div>
       `
     }
     
     removeItem(index) {
       vtexjs.checkout.removeItems([{index}])
     }
     
     updateItem(obj) {
       let { index, qty, calc } = obj
       let quantity = qty + +calc
       if (quantity) {
         vtexjs.checkout.updateItems([{index, quantity}], null, false)
       }
     }
     
     getTotal() {
       const itemsTotal = this.orderForm.totalizers.find(item => item.id === 'Items')
       const total = itemsTotal ? itemsTotal.value / 100 : 0
       return `R$ ${total.formatMoney()}`
     }
     
     getQuantity() {
       const qty = this.orderForm.items.reduce((prev, next) => prev + next.quantity, 0)
       return qty
     }
     
     printQuantity(qty) {
       return `${qty}`
     }
     
     update(orderForm) {
       this.orderForm = orderForm
       this.mount()
     }
     
     mount() {
       $('.js-minicart').html(this.render())
     }
}

$(document).ready(function(){
    window.Minicart = new Minicart();

    $('body').on('click', '.minicart__handle', function(){
        $('.minicart').toggleClass('active');
    })
})