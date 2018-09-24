class AddHover {
    constructor() {
      const self = this;
      this.target = $('.header');

      $('body').on('mouseenter', '.header__menu', function(){
        self.hover();
      });

      $('body').on('mouseleave', '.header__menu', function(){
        self.hover();
      });
    }
    
    hover() {
      const self = this;
      let rolloverClass = 'hover';
      if(self.target.hasClass(rolloverClass)){
        self.target.removeClass(rolloverClass);
        return false
      }
      self.target.addClass(rolloverClass);
    }  
  }
  
  new AddHover('.header');