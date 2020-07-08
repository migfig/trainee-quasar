import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import definitions from './module-definitions';
import { IStore } from './../types/DefinitionsState';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<IStore>({
    modules: {
      definitions
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: false //!!process.env.DEV
  });

  return Store;
});
