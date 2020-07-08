import { ActionTree } from 'vuex';
import IDefinitionsState, { IStore } from 'src/types/DefinitionsState';
import IMenuItem from 'src/types/MenuItem';
import IDefinition, { ITestDefinition } from 'src/types/Definition';

const actions: ActionTree<IDefinitionsState, IStore> = {
  setSelectedMenuOption: ({ commit }, option: IMenuItem) =>
    commit('setSelectedMenuOption', option),
  setIsDrawerVisible: ({ commit }, value: boolean) =>
    commit('setIsDrawerVisible', value),

  // definitions
  setSelectedDefinition: ({ commit }, def: IDefinition) =>
    commit('setSelectedDefinition', def),  
  addDefinition: ({ commit }) => commit('addDefinition'),
  cloneDefinition: ({ commit }, def: IDefinition) => commit('cloneDefinition', def),
  removeDefinition: ({ commit }, def: IDefinition) => commit('removeDefinition', def),

  // tests
  setSelectedTestDefinition: ({ commit }, test: ITestDefinition) =>
    commit('setSelectedTestDefinition', test),
  addTest: ({ commit }) => commit('addTest'),
  cloneTest: ({ commit }, currentTest: ITestDefinition) => commit('cloneTest', currentTest),
  removeTest: ({ commit }, currentTest: ITestDefinition) => commit('removeTest', currentTest),

  // failed tests
  setFailedTests: ({ commit }, tests: ITestDefinition[]) =>
    commit('setFailedTests', tests)
};

export default actions;
