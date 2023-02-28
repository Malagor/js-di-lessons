import { Route } from '../routing/route.js';

export class AboutPageRoute extends Route {
	isMatch(hash) {
		return hash === '#about';
	}

	sortOrder() {
		return 10;
	}

	render() {
		console.log('About Route works!!');
	}
}
