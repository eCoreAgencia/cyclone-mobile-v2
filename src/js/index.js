import '../scss/main.scss'
//import './modules/vtexRequest'


import './components/minicart';
import './components/loader';
import './components/menu';
import './components/makeMenu';
import './components/searchForm';
//import './components/shelf';
import './components/filter';
//import './components/buyBuyCategory';
import './components/product';


import './components/buy-by-category/main'


import './pages/global';
import './pages/home';
import './pages/empty-search';


$(document).ready(function(){
    if($('li.helperComplement')[0]){
        $('li.helperComplement').remove();
      }
})

