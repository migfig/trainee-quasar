// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../node_modules/highlight.js/types/index.d.ts"/>
import { GetterTree } from 'vuex';
import marked from 'marked';
import hljs from 'highlight.js';

import IDefinitionsState, { IStore } from 'src/types/DefinitionsState';
import IMenuItem from 'src/types/MenuItem';
import IDefinition, { ITestDefinition } from 'src/types/Definition';

export const findSelectedDefinition = (state: IDefinitionsState): IDefinition =>
  state.definitions.find(
    (d: IDefinition) => d.id === state.selectedDefinitionId
  ) as IDefinition;

export const findSelectedTestDefinition = (
  state: IDefinitionsState
): ITestDefinition =>
  findSelectedDefinition(state).sourceTests.find(
    st => st.id === state.selectedTest.id
  ) as ITestDefinition;

const getters: GetterTree<IDefinitionsState, IStore> = {
  selectedMenuOption: (state): IMenuItem =>
    state.menuOptions.find(
      d => d.label === state.selectedMenuOptionLabel
    ) as IMenuItem,
  selectedDefinition: (state): IDefinition => findSelectedDefinition(state),
  selectedTest: (state): ITestDefinition => state.selectedTest,
  compiledDescriptionMarkdown: state =>
    marked(findSelectedDefinition(state).description, {
      langPrefix: 'hljs language-',
      highlight: code => hljs.highlightAuto(code, ['css', 'html', 'markdown']).value
    }),
  compiledTestsMarkdown: state =>
    findSelectedDefinition(state).sourceTests.map(t => marked(t.text)),
  compiledFailedTestsMarkdown: state =>
    state.failedTests.filter(t => t.failed === true).map(t => marked(t.text)),
  compiledSucceededTestsMarkdown: state =>
    state.failedTests.filter(t => t.failed === false).map(t => marked(t.text)),
  canRemoveDefinitions: state => state.definitions.length > 1,
  canRemoveTests: state => findSelectedDefinition(state).sourceTests.length > 1,
  selectedLanguage: state => state.selectedLanguage,
  languages: state => state.languages
};

export default getters;
