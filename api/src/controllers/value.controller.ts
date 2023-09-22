import express, { Request, Response } from 'express';
const router = express.Router();

import * as controller from '../services/value.service';
import { ResponseWrapper } from '../domain/dtos/response-wrapper';
import { FibonnaciIndexEntity } from '../domain/entities/fibonnaci-index.entity';
import { FibonnaciEntity } from '../domain/entities/fibonnaci.entity';

// get all the posted indexes
router.get('/', async (req: Request, res: Response) => {
	const result: ResponseWrapper<FibonnaciIndexEntity[]> =
		await controller.getAll();

	res.status(result.status).json(result);
});

// get all the posted indexes and its values
router.get('/all-complete', async (req: Request, res: Response) => {
	const result: ResponseWrapper<FibonnaciEntity[] | null> =
		await controller.getAllComplete();

	res.status(result.status).json(result);
});

// post an index
router.post('/', async (req: Request, res: Response) => {
	const result: ResponseWrapper<Boolean> = await controller.create(
		req.body as { index: number }
	);

	res.status(result.status).json(result);
});

export default router;
