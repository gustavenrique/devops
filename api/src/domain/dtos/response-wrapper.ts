export class ResponseWrapper<T> {
	constructor(status: number, message: string, data?: T) {
		this.status = status;
		this.message = message;
		this.data = data;
	}

	public data: T | undefined;

	public message: string;

	public status: number;
}
