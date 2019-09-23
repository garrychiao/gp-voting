import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/main.css';
import App from './App.vue'
// import { longClickDirective } from 'vue-long-click'

// const longClickInstance = longClickDirective({delay: 3000, interval: 0})
// Vue.directive('longclick', longClickInstance)

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
