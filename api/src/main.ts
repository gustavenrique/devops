// Express server setup
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
import valuesRouter from './controllers/value.controller';

app.get('/', (req: Request, res: Response) => {
	res.status(200).json({
		message: 'Welcome to Fibonnaci API',
		data: null,
		status: 200,
	});
});

app.use('/values', valuesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
	console.log(
		`Server listening on ${
			process.env.port ? `port ` : `http://localhost:`
		}${PORT}`
	)
);
