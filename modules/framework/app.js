import IoC from './ioc.js';
import appConfig from '../../configs/appConfig.js';
import { ServiceProvider } from './service-provider.js';
import { Logger } from './logger.js';
import { Router } from '../routing/router.js';

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

		/** @type {Router}*/
		const router = ioc.use(Router);
		router.init();

		/** @type {Logger}*/
		const logger = ioc.use(Logger);

		logger.info('App successfully run.');

		return ioc;
	}
}
