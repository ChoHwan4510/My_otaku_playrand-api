import { Global, Injectable } from '@nestjs/common';
import { DefaultModel } from "./default.model";
import database_json from '@root/config/database.json';

@Global()
@Injectable()
export class Model extends DefaultModel {
	async connect() {
		const { chino } = database_json;
		console.log(chino);
		await this.set_db_conn(chino);
	}
}