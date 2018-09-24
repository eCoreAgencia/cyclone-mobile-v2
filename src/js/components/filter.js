class Filter {
  constructor(){
    this.menu = document.querySelector('.logo ');
    this.init();
  }

  init(){
    $('.orderBy .select select').on('change', function(){
      const value = $(this).val();
      window.location.href = window.location.pathname + '?PS=12&' + value;
    })
    
    if(this.isExist(this.menu)){
      console.log(this.menu);
    } else {
      console.log('Não existe');
    }

    $('.filter fieldset h5').each(function(){
      if($(this).next('div').find('label')[0]){
        const text = $(this).text();
        let label = $(this).next('div').html();
        const html = `
          <li class="filter__item"><span>${text}</span>
            <div class="filter__options">
              ${label}
            </div>
          </li>`
        $('.filter__menu').append(html);
      }
    })

    $(".filter input[type='checkbox']").vtexSmartResearch();
  }

  isExist(e){
    const exist = (e == null) ? false : true;
    return exist;
  }
}

if($('body').hasClass('category')){
  window.filter = new Filter();
}

