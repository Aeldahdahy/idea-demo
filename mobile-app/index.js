import { AppRegistry } from 'react-native';
import App from './App'; // Ensure this path matches your app's entry component
import { name as appName } from './app.json'; // Ensure app.json exists and has a 'name' field

AppRegistry.registerComponent(appName, () => App);
