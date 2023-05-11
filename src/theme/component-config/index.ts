import { deepmerge } from '@mui/utils';
import { InputComponentsConfig } from './input';
import { NavigationComponentsConfig } from './navigation';
import { DataDisplayComponentsConfig } from './data-display';
import { LayoutComponentsConfig } from './layout';
import { FeedbackComponentsConfig } from './feedback';

const ComponentConfig = deepmerge(
  deepmerge(
    deepmerge(InputComponentsConfig, DataDisplayComponentsConfig),
    deepmerge(NavigationComponentsConfig, LayoutComponentsConfig)
  ),
  FeedbackComponentsConfig
);
export default ComponentConfig;
