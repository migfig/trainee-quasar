import { Module } from 'vuex';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import IDefinitionsState, { IStore } from './../../types/DefinitionsState';

const definitionsModule: Module<IDefinitionsState, IStore> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default definitionsModule;
