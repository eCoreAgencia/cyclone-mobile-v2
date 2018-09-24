<template>
  <div :id="slug" class="buy-by-category" :data-id="id">
    <div class="category category__card">
      <div class="category__card-header">
        <div class="category__card-media">
          <img src="http://via.placeholder.com/275x275">
        </div>
        <div class="category__card-info">
          <span class="category__name">{{ titulo }}</span>
          <a class="category__link" :href="url">Ver todos</a>
        </div>
      </div>

      <div class="category__menu">
        <ul class="menu-list">
          <Category v-for="category in categories" @onButtonClick="getProducts" :key="category.id" :name="category.name" :url="category.url" :id="category.id"/>
        </ul>
      </div>
    </div>
    <div class="shelf shelf__carousel--category"></div>
  </div>
</template>

<script>
  import Category from './Category.vue';
  import vtexRequest from '../../../modules/vtexRequest';
  import { setTimeout } from 'timers';
import { slugify } from '../../../utils';

  export default {
    props: {
      id: Number,
      titulo: String,
      url: String,
      categories: Array
    },
    computed: {
      slug: function(){
        let slug = slugify(this.titulo);
        return slug;
      }
    },
    mounted(){
      const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M0 32.47l30.24 29.98 2.62-2.49L4.19 31.23 32.95 2.49 30.22 0 0 29.98v2.49z"/></svg></button>`
      const shelf__next = `<button type='button' class='slick-next shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M32.95 29.98L2.72 0 .1 2.49l28.66 28.74L0 59.96l2.73 2.49 30.22-29.98v-2.49z"/></svg></button>`

      const api = new vtexRequest();

      const list = $(`.buy-by-category[data-id="${this.id}"] .shelf__carousel--category`);

      const products = api.getProductWithShelfId(this.id, '65c15678-2bbe-72e0-3aa6-0aa635db2f86')
                        .then(response => {
                          setTimeout(function(){
                            $(window).trigger('productFinished');
                          }, 1000)
                          list.html(response)
                          });


      $(`.buy-by-category[data-id="${this.id}"] .category__card .menu-list`).each(function () {
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

      //renderProducts();



      if($(`#${this.slug}.buy-by-category`)[0]){
        const slug = this.slug;
        $(`#${slug}.buy-by-category .category__card-media`).load(`/bannermenu.html #${slug} img`, function(){
          const src = $(`#${slug}.buy-by-category .category__card-media`).find('img').attr('src');
          console.log(src);
          $(`#${slug}.buy-by-category .category__card-media`).css('background-image', `url(${src})`);

        });
      }


    },
    destroyed(){

    },
    data() {
      return {

      }
    },
    methods: {
      getProducts(id){

        const api = new vtexRequest();

        const list = $(`.buy-by-category[data-id="${this.id}"] .shelf__carousel--category`);

        const products = api.getProductWithShelfId(id, '65c15678-2bbe-72e0-3aa6-0aa635db2f86')
                          .then(response => {
                            console.log(response, 'result')
                            setTimeout(function(){
                              $(window).trigger('productFinished');
                            }, 1000)
                            list.html(response)
                            });
      }


    },
    components: {
      Category
    }

  }
</script>


