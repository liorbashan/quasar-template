import { IJwtPayload } from './../types/cm-jwt.interface';
import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import jwtDecode from 'jwt-decode';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (
  {
    /*store*/
  }
) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    if (to.meta.isAuth === true) {
      const userToken = localStorage.getItem('cm-token');
      if (userToken == null) {
        next({ name: 'Login' });
      }
      const decodedToken: IJwtPayload = jwtDecode(userToken!);
      if (isTokenExpired(decodedToken.exp!)) {
        next({ name: 'Login' });
      }
      if (to.meta.isAdmin === true && !decodedToken.groups.includes('AdTechCMAdmin')) {
        next({ name: 'Login' });
      }
    }
    next();
  });

  return Router;
});

const isTokenExpired = (tokenExpirationTimestamp: number): boolean => {
  const currentDate = parseInt(new Date().getTime().toString().slice(0, -3), 10);
  return tokenExpirationTimestamp < currentDate;
};
