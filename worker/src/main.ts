import { createClient } from 'redis';
import { config } from './config';

const redis = createClient({
	url: config.redis.connection,
});

const fib = (index: number): number => {
	if (index < 2) return 1;

	return fib(index - 1) + fib(index - 2);
};

(async () => {
	await redis.connect();

	const subscriber = redis.duplicate();

	await subscriber.connect();

	await subscriber.subscribe('insert', (index: string) => {
		console.log('Insert event - BEGIN - Index: ' + index);

		const calculatedNumber: string = fib(Number(index)).toString();

		console.log('Insert event - END - Result: ' + calculatedNumber);

		redis.HSET('fibonnaci-values', {
			[index]: calculatedNumber,
		});
	});
})();
