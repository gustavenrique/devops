import { createClient } from 'redis';
import config from './config';

const redisClient = createClient({
	url: config.redis,
});

const fib = (index: number): number => {
	if (index < 2) return 1;

	return fib(index - 1) + fib(index - 2);
};

const sub = redisClient.duplicate();

sub.on('message', (channel, message: string) => {
	console.log('Event received - Message: ' + message);
	redisClient.hSet('fibonnaci-values', message, fib(Number(message)));
});

sub.subscribe('insert', () => console.log('Subscribed to event...'));
