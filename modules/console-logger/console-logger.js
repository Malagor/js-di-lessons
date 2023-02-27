import { Logger } from '../framework/logger.js';

export class ConsoleLogger extends Logger {
	debug(...message) {
		console.log(message);
	}

	info(...message) {
		console.log(`INFO: ${message}`);
	}

	error(...message) {
		console.error(message);
	}
}
