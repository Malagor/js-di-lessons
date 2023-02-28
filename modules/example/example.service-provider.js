import { ServiceProvider } from '../framework/service-provider.js';
import {
	APP_CONFIG_TOKEN,
	APP_TITLE_TOKEN,
	ROUTERS_TOKEN,
} from './contracts.js';
import appConfig from '../../configs/appConfig.js';
import { ExampleService } from './example.service.js';
import { RouteCollection } from '../routing/route-collection.js';
import { HomePageRoute } from './home-page.route.js';
import { AboutPageRoute } from './about-page.route.js';

class ExampleServiceProvider extends ServiceProvider {
	register(ioc) {
		ioc.singleton(APP_TITLE_TOKEN, () => 'DI App');

		ioc.resolving(APP_TITLE_TOKEN, (ctx) => {
			return `<h1>${ctx.instance}</h1>`;
		});

		ioc.singleton(APP_CONFIG_TOKEN, () => {
			const { providers, ...config } = appConfig;
			return config;
		});

		ioc.resolving(APP_CONFIG_TOKEN, (ctx) => ({
			...ctx.instance,
			title: ctx.ioc.use(APP_TITLE_TOKEN),
		}));

		// регистрация сервиса. Токен === класс
		ioc.singleton(ExampleService, () => new ExampleService(ioc));

		// регистрация контейнера однотипных данных
		ioc.singleton(ROUTERS_TOKEN, () => []);

		ioc.resolving(ROUTERS_TOKEN, (ctx) => {
			return [
				...ctx.instance,
				{
					path: '/',
					title: 'Home page',
				},
				{
					path: 'about-us',
					title: 'About Us',
				},
			];
		});

		ioc.resolving(RouteCollection, (ctx) => {
			/** @type {RouteCollection} */
			const routerCollection = ctx.instance;

			routerCollection.addRoute(new HomePageRoute());
			routerCollection.addRoute(new AboutPageRoute());

			return routerCollection;
		});
	}
}

export default new ExampleServiceProvider();
