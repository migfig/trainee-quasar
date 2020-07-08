import IDefinition, { ITestDefinition } from './../../types/Definition';
import IMenuItem from './../../types/MenuItem';
import IDefinitionsState from './../../types/DefinitionsState';

const definitionFiles = (ctx => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return ctx.keys().map(ctx);
})(
  require.context('./../../training-definitions', true, /.*.json/)
) as IDefinition[];

export const firstDefinitionFile = (): IDefinition =>
  definitionFiles && Array.isArray(definitionFiles) && definitionFiles.length
    ? definitionFiles[0]
    : definitionFiles[0];

export const firstTestDefinition = (def: IDefinition): ITestDefinition =>
  (def.sourceTests && Array.isArray(def.sourceTests) && def.sourceTests.length
    ? def.sourceTests[0]
    : null) as ITestDefinition;

export const SELECTED_MENU_OPTION_KEY = 'selectedMenuOption';
export const IS_DRAWER_VISIBLE_KEY = 'isDrawerVisible';

const state: IDefinitionsState = {
  // side-bar menu options
  menuOptions: [
    {
      label: 'Home',
      route: '/',
      icon: 'home'
    },
    {
      label: 'About',
      route: '/about',
      icon: 'about'
    }
  ] as IMenuItem[],
  selectedMenuOptionLabel:
    localStorage.getItem(SELECTED_MENU_OPTION_KEY) || 'Home',
  isDrawerVisible: localStorage.getItem(IS_DRAWER_VISIBLE_KEY)
    ? localStorage.getItem(IS_DRAWER_VISIBLE_KEY) === 'true'
    : false,

  // training definition items
  definitions: definitionFiles,
  selectedDefinitionId: firstDefinitionFile().id,
  selectedTest: firstTestDefinition(firstDefinitionFile()),

  // failed tests
  failedTests: [] as ITestDefinition[],

  // languages
  languages: [
    'Arabic',
    'Chinese',
    'English',
    'French',
    'Portuguese',
    'Russian',
    'Spanish'
  ],
  selectedLanguage: 'English'
};

export default state;
