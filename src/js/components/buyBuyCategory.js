import {
  productShelf
} from './shelf';
import vtexRequest from '../modules/vtexRequest';


class BuyByCategory {
  constructor(element, departments) {
    this.element = element;
    this.departments = departments.split(',');

    this.mount();

    const self = this;
    loader.render('.js-buy-by-category');
    const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M0 32.47l30.24 29.98 2.62-2.49L4.19 31.23 32.95 2.49 30.22 0 0 29.98v2.49z"/></svg></button>`
    const shelf__next = `<button type='button' class='slick-next shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M32.95 29.98L2.72 0 .1 2.49l28.66 28.74L0 59.96l2.73 2.49 30.22-29.98v-2.49z"/></svg></button>`


    $('body').on('click', '.category__menu a', function (e) {
      e.preventDefault();
      const categoryID = $(this).data('category-id');
      const departmentID = $(this).parents(`.buy-by-category`).data('department-id');
      self.updateShelf(categoryID, departmentID);
    })

    $(window).on('cardCategoryFinished', function () {
      $('.js-buy-by-category .loading').remove();
      $('.category__card .menu-list').each(function () {
        if ($('li', this).length > 5 && !$(this).hasClass('slick-initialized')) {
          $(this).slick({
            vertical: true,
            slidesToShow: 5,
            infinite: false,
            prevArrow: shelf__prev,
            nextArrow:shelf__next
          })
        }
      })
    })



    $(window).on('productFinished', function () {
      $('.buy-by-category .shelf ul').each(function () {
        if ($('li', this).length > 5 && !$(this).hasClass('slick-initialized')) {
          $(this).slick({
            arrows: true,
            slideToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            variableWidth: true,
            prevArrow: shelf__prev,
            nextArrow:shelf__next
          });
        }
      })
    })
  }







  filterCategoryByDepartment(categories, departmentID) {
    const filteredCategories = categories.filter(category => category.id == parseInt(departmentID))
    return filteredCategories;
  }

  createCardCategory({id, url, name, children}) {
    const cardCategory = `
          <div class="buy-by-category" data-department-id="${id}">
            <div class="category category__card" data-category-id="${id}">
              <div class="category__card-header">
              <div class="category__card-media"><img src="http://via.placeholder.com/275x275"></div>
              <div class="category__card-info"><span class="category__name">${name}</span><a class="category__link" href="${url}">Ver todos</a></div>
              </div>
              ${children.length > 0 ? this.displayMenu(children): ''}
            </div>
            <div class="shelf shelf__carousel--category">
                <ul></ul>
            </div>
          </div>`
    return cardCategory;
  }

  displayMenu(children) {
    const html = `
      <div class="category__menu">
          <ul class="menu-list">
              ${ children.map(category => {
                return `<li><a href="${category.url}" data-category-id="${category.id}">
                  ${category.name}
                  </a></li>`;
                  }).join('')
              }
          </ul>
      </div>`

    return html;
  }

  renderProducts(products, departmentID) {
    let html = '';
    const shelfs = products.map(async product => {
      const api = new vtexRequest();
      const productWithVariations = await api.getProductWithVariations(product.productId)
      if(productWithVariations.available){
        productWithVariations.link = product.link;
        productWithVariations.image = product.items[0].images[0].imageTag;
        const shelf = productShelf(productWithVariations, true);
        html += shelf;
        const list = $(`.buy-by-category[data-department-id="${departmentID}"] .shelf__carousel--category ul`);
        if(list.hasClass('slick-initialized')){
          list.slick('unslick');
        }
        list.html(html);
        $(window).trigger('productFinished');
      }
    })

  }

  async updateShelf(categoryID, departmentID) {
    const api = new vtexRequest();
    const list = $(`.buy-by-category[data-department-id="${departmentID}"] .shelf__carousel--category ul`);
    const products = await api.getProductsByCategoryId(categoryID);
    this.renderProducts(products, departmentID)
  }

  async mount() {
    const api = new vtexRequest();
    const productsByDepartemnt = [];
    const categories = await api.getCategoryTree(2);


    const categoriesByDepartement = this.departments.map(departmentID => this.filterCategoryByDepartment(categories, departmentID));
    const appendCardCategories = categoriesByDepartement.map(category => this.createCardCategory(...category)).join('');

    const getProductsByDepartemnt = this.departments.map(async departmentID =>  {
      const products = await api.getProductsByCategoryId(departmentID);
      this.renderProducts(products, departmentID)
    });


    this.element.html(appendCardCategories);
    $(window).trigger('cardCategoryFinished');

  }

}

$(document).ready(function () {

  window.buyCategory = new BuyByCategory($('.js-buy-by-category'), $('.js-department-ids').html());


})
