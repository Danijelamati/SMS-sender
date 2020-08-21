/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import { BackgroundTask } from "./app/util/background";


AppRegistry.registerHeadlessTask('Background', () => BackgroundTask);
AppRegistry.registerComponent(appName, () => App);
