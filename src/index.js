import Vue from 'vue'
import App from './app.vue'
import { createRouter } from '@/route'
import { createStore } from '@/store'
import { sync } from 'vuex-router-sync'

export function createApp () {
  const router = createRouter();
  const store = createStore();
  router.beforeEach((to, from, next) => {
    if (process.env.NODE_ENV != 'NODE') {
      document.title = to.meta.title || '鸭题库';
    }
    next();
  })
  sync(store, router)
  const app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
  });
  return {
    app,
    router,
    store
  };
}
