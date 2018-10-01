$('.has-sub').on('click', function(event){
    var myLink = $(this).find('.menu-anchor-sidepanel');
    myLink.next().slideToggle();
});

$('.header__info-menu__ico').on('click', function(event){
    $('#menu-mob').toggleClass('active');
});

$('.close-menu').on('click', function(event){
    $('#menu-mob').removeClass('active');
});