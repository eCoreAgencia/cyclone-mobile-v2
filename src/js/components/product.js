export default (function() {
if ($('body').hasClass('product')) {
  let thumbs = $('.thumbs')
  let fix_zoom = function () {
    window.LoadZoom = function (pi) {
      let zoomImage = $(".image-zoom")
      // zoomImage.jqzoom()
      $('.zoomPup, .zoomWindow, .zoomPreload').remove()
      if (!zoomImage.length) {
        let img = $('#image-main')
        let imgUrl = img.attr('src')
        img.wrap(`<a href="${imgUrl}" class="image-zoom" />`)
      }
      let zoom = $('#image').addClass('easyzoom easyzoom--overlay').easyZoom()
      window.zoomAPI = zoom.data('easyZoom')
      window.ImageControl = () => null
    }
    LoadZoom(0)
  }
  $(fix_zoom)



  const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M0 32.47l30.24 29.98 2.62-2.49L4.19 31.23 32.95 2.49 30.22 0 0 29.98v2.49z"/></svg></button>`
  const shelf__next = `<button type='button' class='slick-next shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M32.95 29.98L2.72 0 .1 2.49l28.66 28.74L0 59.96l2.73 2.49 30.22-29.98v-2.49z"/></svg></button>`

  $('.shelf__carousel--full ul').slick({
    arrows: true,
    slideToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    variableWidth: true,
    prevArrow: shelf__prev,
    nextArrow:shelf__next
  });

  class Product {
    constructor() {
      let self = this
      window.ImageControl = () => null
      this.skuJson = skuJson ? skuJson : skuJson_1
      this.thumbsClickEvent()
      this.simulateShipping()

      $('.js-product-buy-button').on('click', function (e) {
        e.preventDefault()
        let quantity = $('.js-quantity-value').val()
        addToCart(self.skuJson.skus[0], +quantity)
      })

      $('.js-product-qty-button').on('click', function (e) {
        e.preventDefault()
        let val = $(this).data('value')
        self.changeQuantity(val)
      })

      $('.js-product-qty-value').on('blur', function (e) {
        e.preventDefault()
        let val = +$(this).val()
        if (!val || val < 1) $(this).val(1)
      })
    }

    changeQuantity(val) {
      let currentVal = $('.js-product-qty-value').val()
      let newVal = +currentVal + +val
      if (newVal) {
        $('.js-product-qty-value').val(newVal)
      }
    }

    thumbsClickEvent() {
      thumbs.on('click', 'a', function (e) {
        e.preventDefault()
        let imgUri = $(this).attr('rel')
        zoomAPI._init()
        zoomAPI.swap(imgUri, imgUri)
        if (!imgUri) {
          zoomAPI.teardown()
        }
        thumbs.find('a').removeClass('ON')
        $(this).addClass('ON')
      })
    }

    simulateShipping() {
      //window.OMSimulateShipping = new SimulateShipping()
    }

    
  }

  $(() => {
    window.OMProduct = new Product()
  })
}
})()
