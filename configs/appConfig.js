import exampleServiceProvider from '../modules/example/example.service-provider.js';

/**
 * @typedef AppConfig
 * @type {Object}
 * @property {Array<ServiceProvider>} providers
 */

/**
 * @type {AppConfig}
 */
const appConfig = {
	providers: [exampleServiceProvider],
	foo: 'FOO',
};

export default appConfig;
