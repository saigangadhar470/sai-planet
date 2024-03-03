/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/Components/App';
import { name as appName } from './app.json';
import { AuthProvider } from './src/Components/AuthContext';


const ReduxApp = () => (

    <AuthProvider>
        <App />
    </AuthProvider>

)

AppRegistry.registerComponent(appName, () => ReduxApp);
