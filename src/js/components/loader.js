import TweenMax from "gsap/TweenMax";

export default class Loader {
	constructor(element){
		this.loaderHtml = ``;
		this.render(element);
		
	}

	render(element){
		$('<div class="loading"><span class="ball"></span><span class="ball"></span><span class="ball"></span><span class="ball"></span><span class="ball"></span></div>').appendTo(element);		
		const balls = document.querySelectorAll('.ball');
		TweenMax.staggerFromTo(balls, 1,  {
			scale: .1,
			opacity: 0
		}, {
			scale: 1.2,
			opacity: 1,
			repeat: -1,
			yoyo: true
		}, .2);
	}

	remove(element){
		$(element).find('.loading').remove();
	}


}

$(document).ready(function(){
	window.loader = new Loader();
})
