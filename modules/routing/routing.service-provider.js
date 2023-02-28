import { ServiceProvider } from '../framework/service-provider.js';
import { Router } from './router.js';
import { RouteCollection } from './route-collection.js';
import { NotFoundRoute } from './not-found.route.js';

class RoutingServiceProvider extends ServiceProvider {
	register(ioc) {
		ioc.singleton(Router, () => new Router(ioc));

		ioc.singleton(RouteCollection, () => new RouteCollection(ioc));

		ioc.resolving(RouteCollection, (ctx) => {
			/** @type {RouteCollection}*/
			const routerCollection = ctx.instance;

			routerCollection.addRoute(new NotFoundRoute());

			return routerCollection;
		});
	}
}

export const routingServiceProvider = new RoutingServiceProvider();
