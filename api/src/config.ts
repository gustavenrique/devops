interface Configuration {
	redis: {
		host: string;
		port: number;
	};
	postgres: {
		user: string;
		password: string;
		database: string;
		host: string;
		port: number;
	};
}

export const config = {
	redis: {
		host: process.env.REDIS_HOST,
		port: Number(process.env.REDIS_PORT),
	},
	postgres: {
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DATABASE,
		host: process.env.POSTGRES_HOST,
		port: Number(process.env.POSTGRES_PORT),
	},
} as Configuration;
