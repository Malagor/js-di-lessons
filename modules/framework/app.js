import IoC from './ioc.js';
import appConfig from '../../configs/appConfig.js';
import { ServiceProvider } from './service-provider.js';
import { Logger } from './logger.js';

export class App {
	/**
	 *
	 * @return {IoC}
	 */
	run() {
		const ioc = new IoC();

		for (let serviceProvider of appConfig.providers) {
			if (!(serviceProvider instanceof ServiceProvider)) {
				console.error(
					'Incorrect type of ServiceProvider',
					serviceProvider,
				);
				throw new Error('Incorrect type of ServiceProvider');
			}
			serviceProvider.register(ioc);
		}

		/** @type {Logger}*/
		const logger = ioc.use(Logger);

		logger.info('App successfully run.');

		return ioc;
	}
}
