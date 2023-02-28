import { Route } from './route.js';

export class NotFoundRoute extends Route {
	isMatch(hash) {
		return true;
	}

	sortOrder() {
		return Number.MAX_SAFE_INTEGER;
	}

	render() {
		console.log('404 Error. Not found route works!!');
	}
}
