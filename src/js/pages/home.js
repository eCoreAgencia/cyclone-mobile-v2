


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

    const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129"><g><path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"/></g></svg></button>`
    const shelf__next = `<button type='button' class='slick-next shelf__button'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129"><g><path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/></g></svg></button>`

    $('.shelf__carousel--full ul').slick({
      arrows: true,
      slideToShow: 2,
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

    $('.section__shelf').each(function(){
      var myButtons = $(this).find('.shelf__button');
      var myTitle = $(this).find('.section__title .container');

      myButtons.insertAfter(myTitle);
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
