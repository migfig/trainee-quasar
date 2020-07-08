import { MutationTree } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

import IDefinition, { ITestDefinition } from './../../types/Definition';
import IMenuItem from './../../types/MenuItem';
import IDefinitionsState from './../../types/DefinitionsState';

import { 
  SELECTED_MENU_OPTION_KEY,
  IS_DRAWER_VISIBLE_KEY,
  firstTestDefinition,
} from './state';

import {
  findSelectedDefinition,
  findSelectedTestDefinition,
} from './getters';

const mutation: MutationTree<IDefinitionsState> = {
  setSelectedMenuOption(state, option: IMenuItem) {
    state.selectedMenuOptionLabel = option.label;
    localStorage.setItem(SELECTED_MENU_OPTION_KEY, option.label);
  },
  setIsDrawerVisible(state, value: boolean) {
    state.isDrawerVisible = value;
    localStorage.setItem(IS_DRAWER_VISIBLE_KEY, value ? 'true' : 'false');
  },
  setSelectedDefinition(state, def: IDefinition) {
    state.selectedTest = firstTestDefinition(def);
    state.failedTests = [];
  },
  setSelectedTestDefinition(state, test: ITestDefinition) {
    state.selectedTest = test;
  },

  // definitions
  addDefinition(state) {
    state.definitions.push({
      id: uuidv4(),
      name: `Definition-${state.definitions.length + 1}`,
      category: 'Default',
      description: `## Description ${state.definitions.length + 1}`,
      htmlSource: '',
      sourceTests: [],
      failedTests: [],
      isComplete: false,
      isHidden: false,
      videoUrl: 'https://scrimba.com/c/cJKMBT2',
      challengeType: 0,
      forumTopicId: 0
    });
    state.selectedDefinitionId =
      state.definitions[state.definitions.length - 1].id;
  },
  cloneDefinition(state, def: IDefinition) {
    const selectedDef = def || findSelectedDefinition(state);
    state.definitions.push({
      ...selectedDef,
      id: uuidv4(),
      name: `${selectedDef.name}-${state.definitions.filter(d =>
        d.name.startsWith(selectedDef.name)
      ).length + 1}`
    });
    state.selectedDefinitionId =
      state.definitions[state.definitions.length - 1].id;
  },
  removeDefinition(state, def: IDefinition) {
    const selectedIndex = state.definitions.indexOf(
      def || findSelectedDefinition(state)
    );
    state.definitions.splice(selectedIndex, 1);
    state.selectedDefinitionId = state.definitions[0].id;
    state.definitions = [...state.definitions];
  },

  // tests
  addTest(state) {
    const selectedDef = findSelectedDefinition(state);
    selectedDef.sourceTests.push({
      id: uuidv4(),
      text: `Text-${selectedDef.sourceTests.length + 1}`,
      testString: 'assert(true);',
      failed: false
    });
    state.selectedTest =
      selectedDef.sourceTests[selectedDef.sourceTests.length - 1];
  },
  cloneTest(state, currentTest: ITestDefinition) {
    const selectedDef = findSelectedDefinition(state);
    const selectedTst = currentTest || findSelectedTestDefinition(state);
    selectedDef.sourceTests.push({
      ...selectedTst,
      id: uuidv4(),
      text: `${selectedTst.text}-${selectedDef.sourceTests.filter(t =>
        t.text.startsWith(selectedTst.text)
      ).length + 1}`
    });
    state.selectedTest =
      selectedDef.sourceTests[selectedDef.sourceTests.length - 1];
  },
  removeTest(state, currentTest: ITestDefinition) {
    const selectedDef = findSelectedDefinition(state);
    const selectedIndex = selectedDef.sourceTests.indexOf(
      currentTest || findSelectedTestDefinition(state)
    );
    selectedDef.sourceTests.splice(selectedIndex, 1);
    state.selectedTest = selectedDef.sourceTests[0];
    selectedDef.sourceTests = [...selectedDef.sourceTests];
  },

  // failed tests
  setFailedTests(state, tests: ITestDefinition[]) {
    state.failedTests = [...tests];
  }
};

export default mutation;
