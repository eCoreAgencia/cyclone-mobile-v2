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
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="18" viewBox="0 0 17 18"><defs><path id="ftsea" d="M1467.35 82c.45 0 .85.17 1.18.5a1.61 1.61 0 0 1 0 2.34c-.33.32-.73.48-1.18.48-.46 0-.84-.16-1.16-.48-.32-.32-.48-.7-.48-1.16 0-.45.16-.85.48-1.18.32-.33.7-.5 1.16-.5zm-5-13.32h2.74l.78 1.64h12.35c.23 0 .42.08.58.25.16.17.24.37.24.61 0 .15-.04.27-.12.38l-2.96 5.4c-.15.25-.35.46-.61.62a1.6 1.6 0 0 1-.85.24h-6.21l-.74 1.36-.04.12c0 .05.02.1.06.14a.2.2 0 0 0 .14.06h9.65v1.68h-10.01c-.46 0-.84-.17-1.16-.5a1.65 1.65 0 0 1-.28-1.96l1.12-2.08-3-6.32h-1.69zM1475.71 82c.45 0 .84.17 1.16.5.32.33.48.73.48 1.18 0 .45-.16.84-.48 1.16-.32.32-.71.48-1.16.48-.46 0-.85-.16-1.18-.48-.34-.32-.5-.7-.5-1.16 0-.45.16-.85.5-1.18.33-.33.72-.5 1.18-.5z"/></defs><g><g transform="translate(-1462 -68)"><use fill="#fbf7f1" xlink:href="#ftsea"/></g></g></svg>
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