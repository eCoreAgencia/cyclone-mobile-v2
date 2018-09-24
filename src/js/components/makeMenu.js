import vtexRequest from '../modules/vtexRequest';
import { slugify, myLoad } from '../utils';

class MakeMenu {
  constructor() {
    this.categoryTree = [];
    this.init();
    const self = this;
    $(window).on('makeMenuFinished', function(){
      self.getBannerPlaceholder();
    var html = '';
      $('.navbar-department .navbar-dropdown-column').each(function(){
        html += $(this).html();
        $('.header__menu .is-first .navbar-dropdown').html(html);
      });
    });
  }

  async init() {
    let self = this;
    const api = new vtexRequest();
    const categories = await api.getCategoryTree(2);
    //console.log(categories[0].children);
    self.displayMenu(categories[0].children);
    $(window).trigger('makeMenuFinished');
  }



  displayMenu(categories) {
    let self = this;
    const html = categories.map(category => {
      const slug = slugify(category.name);
      return `
					<div id="${slug}"class="navbar-department navbar-item ${category.children.length > 0 ? ' has-dropdown': ''} is-hoverable">
						<a href="${category.url}" class="navbar-link">${category.name}</a>
            ${category.children.length > 0 ? `
              <div class="navbar-dropdown">
                <div class="navbar-dropdown-items">
                  ${self.displaySubMenu(category.children)}
                </div>
                <div class="navbar-dropdown-image">

                  <img src="http://via.placeholder.com/400x289" />
                </div>
              </div>` : ''}
					</div>
				`;
    }).join('');
    $('.header__menu .navbar').html(html);
    $('.header__menu .navbar').addClass('js-make-menu');

  }

  displaySubMenu(children) {

    const html = `${ children.map((category, i) => {
							return `
									${ (i % 10 == 0) ? '<div class="navbar-dropdown-column">' : ''	}
										<a href="${category.url}" class="navbar-item navbar-item-${i}">
											${category.name}
										</a>
									${(i == children.length -1 || (i + 1) % 10 == 0) ? '</div>': ''}
								`;
							}).join('')
						}`

    return html;
  }

  getBannerPlaceholder() {
    $('.navbar-item.has-dropdown').each(function(){
      const id = $(this).attr('id');
      console.log(id);
      const container = `#${id} .navbar-dropdown-image`;
      $(container).load(`/bannermenu.html #${id}`)
    })
  }

}



$(document).ready(function () {
  window.menu = new MakeMenu();
})
