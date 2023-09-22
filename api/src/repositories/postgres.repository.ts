import { Pool, PoolClient } from 'pg';
import { config } from '../config';

const postgres = new Pool(config.postgres);

postgres.on('error', (err: Error) => console.error(err));

postgres.on('connect', async (client: PoolClient) => {
	await client
		.query('CREATE TABLE IF NOT EXISTS fibonnaci (index INT)')
		.catch((err) => console.error(err));
});

export default postgres;
