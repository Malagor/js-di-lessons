import exampleServiceProvider from '../modules/example/example.service-provider.js';
import { consoleLoggerServiceProvider } from '../modules/console-logger/console-logger.service-provider.js';

/**
 * @typedef AppConfig
 * @type {Object}
 * @property {Array<ServiceProvider>} providers
 */

/**
 * @type {AppConfig}
 */
const appConfig = {
	providers: [exampleServiceProvider, consoleLoggerServiceProvider],
	foo: 'FOO',
};

export default appConfig;
