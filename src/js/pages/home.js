


/* $('.shelf__carousel--category ul').slick({
  arrows: true,
  slideToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  centerMode: true,
  variableWidth: true,
  prevArrow: shelf__prev,
  nextArrow:shelf__next
}); */


$(document).ready(function(){
  if($('body').hasClass('home')){
    

    if($('.call__box')[0]){
      $('.call__box').each(function(){
        const img = $('img', this).attr('src');

        $(this).css('background-image', 'url('+img+')');
      })
    }

    $('.product--shelf-flip .product__front').on('click', function(){
      $(this).parents('.product--shelf-flip').addClass('hover');
    })

    var $gallery = $('.banner--full .banner__inner');
    var slideCount = null;

    $gallery.on('init', function(event, slick){
      slideCount = slick.slideCount;
      setSlideCount();
      setCurrentSlideNumber(slick.currentSlide);
    });

    $gallery.on('beforeChange', function(event, slick, currentSlide, nextSlide){
      setCurrentSlideNumber(nextSlide);
    });

    function setSlideCount() {
      var $el = $('.slide-count-wrap').find('.total');
      $el.text(function (i, n) {
          var result = Number(n) + 1;
          if ( result < 10 ) {
              return "0" + slideCount;
          } else {
              return result;
          }
      })
    }

    function setCurrentSlideNumber(currentSlide) {
      var $el = $('.slide-count-wrap').find('.current');
      var n = currentSlide + 1;
      $el.text(function (i, n) {
          var result = currentSlide + 1;
          if ( result < 10 ) {
              return "0" + result;
          } else {
              return result;
          }
      });

    }




    $gallery.slick({
      dots: true,
      autoplay: true,
      arrows: false,
      fade: true,
      infinite: false
    });



    const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="43" height="43" viewBox="0 0 43 43"><defs><path id="vcuya" d="M1460 1326.21l21.21-21.21 21.21 21.21-21.21 21.21z"/><path id="vcuyc" d="M1481.5 1318.5l-7.52 7.52"/><path id="vcuyd" d="M1481.5 1333.02l-7.52-7.52"/><clipPath id="vcuyb"><use fill="#fff" xlink:href="#vcuya"/></clipPath></defs><g><g transform="matrix(-1 0 0 1 1503 -1305)"><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-miterlimit="50" stroke-width="4" clip-path="url(&quot;#vcuyb&quot;)" xlink:href="#vcuya"/></g><g><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-linecap="square" stroke-miterlimit="50" stroke-width="2" xlink:href="#vcuyc"/></g><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-linecap="square" stroke-miterlimit="50" stroke-width="2" xlink:href="#vcuyd"/></g></g></g></g></svg></button>`
    const shelf__next = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="43" height="43" viewBox="0 0 43 43"><defs><path id="vcuya" d="M1460 1326.21l21.21-21.21 21.21 21.21-21.21 21.21z"/><path id="vcuyc" d="M1481.5 1318.5l-7.52 7.52"/><path id="vcuyd" d="M1481.5 1333.02l-7.52-7.52"/><clipPath id="vcuyb"><use fill="#fff" xlink:href="#vcuya"/></clipPath></defs><g><g transform="matrix(-1 0 0 1 1503 -1305)"><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-miterlimit="50" stroke-width="4" clip-path="url(&quot;#vcuyb&quot;)" xlink:href="#vcuya"/></g><g><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-linecap="square" stroke-miterlimit="50" stroke-width="2" xlink:href="#vcuyc"/></g><g><use fill="#fff" fill-opacity="0" stroke="#000" stroke-linecap="square" stroke-miterlimit="50" stroke-width="2" xlink:href="#vcuyd"/></g></g></g></g></svg></button>`

    $('.shelf__carousel--full ul').slick({
      arrows: true,
      slideToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      variableWidth: true,
      prevArrow: shelf__prev,
      nextArrow:shelf__next
    });

    $('.shelf__brand').slick({
      arrows: true,
      slideToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      centerMode: true,
      variableWidth: true,
      prevArrow: shelf__prev,
      nextArrow:shelf__next
    });

    $(window).on('productFinished', function () {
      console.log('productFinished');
      $('.buy-by-category .shelf ul').each(function () {
        if($('li.helperComplement', this)[0]){
          $('li.helperComplement', this).remove();
        }
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
})
