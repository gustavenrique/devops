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
		const result: FibonnaciEntity[] = await getValuesComplete();

		return Ok('Values retrieved successfully', result);
	} catch (error) {
		console.error(error);

		return InternalServerError<FibonnaciEntity[]>();
	}
};

const getValuesComplete: () => Promise<Array<FibonnaciEntity>> = async () => {
	return new Promise((resolve, reject) => {
		try {
			redis.hgetall('fibonnaci-values', (err, values) => {
				let result: FibonnaciEntity[] = new Array<FibonnaciEntity>();

				if (values)
					for (const key in values)
						result.push(
							new FibonnaciEntity(
								Number(key),
								Number(values[key])
							)
						);

				resolve(result);
			});
		} catch (error) {
			reject(error);
		}
	});
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

		console.log('going to publish to redis');

		redis.duplicate().publish('insert', index.toString());

		console.log('published successfully');

		postgres.query('INSERT INTO fibonnaci (index) VALUES ($1)', [index]);

		return Ok('Fibonnaci value will be processed soon');
	} catch (error) {
		console.error(error);

		return InternalServerError<Boolean>();
	}
};
