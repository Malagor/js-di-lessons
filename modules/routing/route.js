export class Route {
	/**
	 *
	 * @param {string} hash
	 * @returns {boolean}
	 */
	isMatch(hash) {
		return false;
	}

	/**
	 * @returns {number}
	 */
	sortOrder() {
		return 0;
	}

	/**
	 * @returns {void}
	 */
	render() {
		console.log('Route.render()');
	}
}
