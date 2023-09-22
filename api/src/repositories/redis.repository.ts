import { createClient } from 'redis';
import { config } from '../config';

const redis = createClient({
	...config.redis,
	retry_strategy: () => 1000,
});

export default redis;
