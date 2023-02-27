import {
	APP_CONFIG_TOKEN,
	APP_TITLE_TOKEN,
	ROUTERS_TOKEN,
} from './modules/example/contracts.js';
import { ExampleService } from './modules/example/example.service.js';
import { App } from './modules/framework/app.js';

const app = new App();
const ioc = app.run();

const appTitle = ioc.use(APP_TITLE_TOKEN);

console.log(appTitle);

const config = ioc.use(APP_CONFIG_TOKEN);

console.log(config);

/** @type {ExampleService} */
const exampleService = ioc.use(ExampleService);

exampleService.run();

console.log(exampleService);

/** @type {Array<{path: string, title: string}>} */
const routers = ioc.use(ROUTERS_TOKEN);

console.log(routers);

for (const router of routers) {
	console.log(`path: "${router.path}", title: "${router.title}'`);
}
