import { Request, Response } from 'express';
import postgres from '../repositories/postgres.repository';
import {
	InternalServerError,
	Ok,
	UnprocessableEntity,
} from '../domain/dtos/http-responses';
import { FibonnaciIndexEntity } from '../domain/entities/fibonnaci-index.entity';
import { QueryResult } from 'pg';
import { ResponseWrapper } from '../domain/dtos/response-wrapper';
import { FibonnaciEntity } from '../domain/entities/fibonnaci.entity';
import redis from '../repositories/redis.repository';

export const getAll = async (): Promise<
	ResponseWrapper<FibonnaciIndexEntity[]>
> => {
	try {
		const result: QueryResult<FibonnaciIndexEntity> = await postgres.query(
			'SELECT index FROM fibonnaci'
		);

		return Ok('Indexes retrieved succesfully', result.rows);
	} catch (error) {
		console.error(error);

		return InternalServerError<FibonnaciIndexEntity[]>();
	}
};

export const getAllComplete = async (): Promise<
	ResponseWrapper<FibonnaciEntity[] | null>
> => {
	try {
		let result: FibonnaciEntity[] | null = null;

		redis.hgetall('fibonnaci-values', (err, values) => {
			result = JSON.parse(
				values['fibonnaci-values']
			) as FibonnaciEntity[];
		});

		return Ok('Values retrieved successfully', result);
	} catch (error) {
		console.error(error);

		return InternalServerError<FibonnaciEntity[]>();
	}
};

export const create = async ({
	index,
}: {
	index: number;
}): Promise<ResponseWrapper<Boolean>> => {
	try {
		if (index > 40)
			return UnprocessableEntity('The index is too much high');

		redis.hset('fibonnaci-values', index.toString(), '');

		redis.duplicate().publish('insert', index.toString());

		postgres.query('INSERT INTO fibonnaci (index) VALUES ($1)', [index]);

		return Ok('Fibonnaci value will be processed soon');
	} catch (error) {
		console.error(error);

		return InternalServerError<Boolean>();
	}
};
