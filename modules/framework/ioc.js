/**
 * Handler
 * @typedef ResolvingHandlerArgs
 * @type {Object}
 * @property {*} instance
 * @property {IoC} ioc
 */

/**
 * ResolvingHandler
 * @callback ResolvingHandlerCallback
 * @param {ResolvingHandlerArgs} args
 */

/**
 * ResolverCallback
 * @callback ResolverCallback
 * @param {IoC} [arg]
 */

/**
 * Token
 * @typedef Token
 * @type {*}
 */

export default class IoC {
	constructor() {
		this._resolvers = {};
		this._isSingleton = {};
		this._resolvingHandlers = {};
		this._resolvedInstances = {};
	}

	/**
	 *
	 * @param {Token} token
	 * @return {*}
	 */
	use(token) {
		if (!this._resolvers[token]) {
			throw new Error(`Resolver for token "${token}" doesn't exist`);
		}

		if (this._resolvedInstances[token]) {
			return this._resolvedInstances[token];
		}

		let instance = this._resolvers[token](this);

		const handlers = this._resolvingHandlers[token] || [];

		for (let handler of handlers) {
			instance = handler({ instance, ioc: this });
		}

		if (this._isSingleton[token]) {
			this._resolvedInstances[token] = instance;
		}

		return instance;
	}

	/**
	 *
	 * @param {Token} token
	 * @param {ResolverCallback} resolver
	 */
	bind(token, resolver) {
		this._resolvers[token] = resolver;
	}

	/**
	 *
	 * @param {Token} token
	 * @param {ResolverCallback} resolver
	 */
	singleton(token, resolver) {
		this._isSingleton[token] = true;
		this.bind(token, resolver);
	}

	/**
	 *
	 * @param token
	 * @param {ResolvingHandlerCallback} handler
	 */
	resolving(token, handler) {
		this._resolvingHandlers[token] = this._resolvingHandlers[token]
			? [...this._resolvingHandlers[token], handler]
			: [handler];
	}

	/**
	 *
	 * @param {ServiceProvider} serviceProvider
	 */
	register(serviceProvider) {
		serviceProvider.register(this);
	}
}
