import Vue from 'vue';
import VueRouter from 'vue-router';
import appRoute from './appRoute';

function transformRoutes (routes, prefix = 'app') {
  return routes.map(item => {
    let { name, title } = item;
    let pathPrefix = prefix == 'app' ? '' : prefix;
    return {
      ...item,
      path: `/${pathPrefix}${name == 'index' ? '/' : `/${name}`}`,
      name: `${name}`,
      meta: {
        title,
      },
      component: () => import(`@/pages/${prefix}/${name}`),
    }
  })
}
let routes = [
  ...transformRoutes(appRoute),
];
Vue.use(VueRouter);
export function createRouter () {
  return new VueRouter({
    routes,
    base: '/yatikuweb',
    mode: 'history',
  });
}
