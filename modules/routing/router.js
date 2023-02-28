import { Logger } from '../framework/logger.js';
import { RouteCollection } from './route-collection.js';

export class Router {
	/**
	 * @constructor
	 * @param {IoC} ioc
	 */
	constructor(ioc) {
		/** @type {Logger} */
		this.logger = ioc.use(Logger);

		/** @type {RouteCollection}*/
		this.routerCollection = ioc.use(RouteCollection);
	}
	init() {
		this.execute();

		window.onhashchange = () => {
			this.execute();
		};
	}

	execute() {
		const routes = this.routerCollection.getRoutes();
		routes.sort((a, b) => a.sortOrder() - b.sortOrder());

		const hash = window.location.hash;

		for (let route of routes) {
			if (route.isMatch(hash)) {
				route.render();

				this.logger.info('Router.execute()');

				return;
			}
		}

		this.logger.error('Router.execute(). Route not found');
	}
}
