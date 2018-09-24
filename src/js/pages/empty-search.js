$(document).ready(function(){
    if($('body').hasClass('empty-search')){
        var word = decodeURI(window.location.search);
        word = word.replace("?ft=","");
        console.log(word);
		$(".box-emptySearch p span em").text(word);
    }
});