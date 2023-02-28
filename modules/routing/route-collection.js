import { Route } from './route.js';

export class RouteCollection {
	/**
	 *
	 * @param {IoC} ioc
	 */
	constructor(ioc) {
		this.ioc = ioc;

		/** @type {Array<Route>}*/
		const routes = [];

		/**
		 *
		 * @return {Route[]}
		 */
		this.getRoutes = () => [...routes];

		/**
		 *
		 * @param {Route} route
		 */
		this.addRoute = (route) => {
			if (!(route instanceof Route)) {
				throw new Error('Invalid type Route');
			}

			routes.push(route);
		};
	}
}
