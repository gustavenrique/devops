interface Configuration {
	redis: {
		connection: string;
	};
}

export const config = {
	redis: {
		connection: process.env.REDIS_CONNECTION,
	},
} as Configuration;
