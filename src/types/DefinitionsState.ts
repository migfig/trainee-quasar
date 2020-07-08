import IDefinition, { ITestDefinition } from './Definition';
import IMenuItem from './MenuItem';

export interface IStore {
  // Define your own store structure, using submodules if needed
  definitions: IDefinitionsState;
}

export default interface IDefinitionsState {
  menuOptions: IMenuItem[];
  selectedMenuOptionLabel: string;
  isDrawerVisible: boolean;
  definitions: IDefinition[];
  selectedDefinitionId: string;
  selectedTest: ITestDefinition,
  failedTests: ITestDefinition[];
  languages: string[];
  selectedLanguage: string;
}
