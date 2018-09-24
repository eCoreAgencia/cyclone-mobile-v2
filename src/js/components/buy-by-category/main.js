import Vue from 'vue'
import App from './App.vue'

if($('#buyByCategory')[0]){
  new Vue({
    el: '#buyByCategory',
    template: '<App/>',
    components: { App }
  })
}
