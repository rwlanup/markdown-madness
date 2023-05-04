import { deepmerge } from '@mui/utils';
import { InputComponentsConfig } from './input';
import { NavigationComponentsConfig } from './navigation';
import { DataDisplayComponentsConfig } from './data-display';
import { LayoutComponentsConfig } from './layout';

const ComponentConfig = deepmerge(
  deepmerge(InputComponentsConfig, DataDisplayComponentsConfig),
  deepmerge(NavigationComponentsConfig, LayoutComponentsConfig)
);
export default ComponentConfig;
