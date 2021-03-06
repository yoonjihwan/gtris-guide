import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import gtris from '@gtris/vue';
import '@gtris/vue/dist/gtris3.css';
import '@/assets/scss/style.scss';

import VueDisqus from 'vue-disqus';

import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import VuePrismEditor from 'vue-prism-editor';
import 'vue-prism-editor/dist/VuePrismEditor.css';
import gtPanel from '@/components/common/Panel.vue';

Vue.prototype.$eventHub = new Vue(); // Global event bus
Vue.config.productionTip = false;
console.log('Gtris3');
Vue.use(gtris);
Vue.use(VueDisqus);
Vue.component('prism-editor', VuePrismEditor);
Vue.component('gt-panel', gtPanel);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
