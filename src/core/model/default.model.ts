import {logger} from "@/lib";
import { Injectable, HttpException } from '@nestjs/common';
import * as R from "ramda";
import * as mysql from 'mysql2/promise';

type db_opt = {
    host: string;
	user: string;
	password: string;
	port: number;
	database: string;
}

@Injectable()
export abstract class DefaultModel {
    private db_pool: mysql.Pool;
    private db_coon: mysql.PoolConnection;
    
    constructor(){
        this.connect();
    }

    abstract connect();

    async set_db_conn(obj: db_opt){
        this.db_pool = mysql.createPool({
            host: obj.host,
            user: obj.user,
            password: obj.password,
            port: Number(obj.port),
            database: obj.database
        });
        this.db_coon = await this.db_pool.getConnection();
    }

    async query(sql: string, data: Array<any> = [], ){
        const sql_type = R.pipe(
			R.trim(),
			R.split(' '),
			R.propOr('', 0),
			R.toUpper,
            R.trim(),
        )(sql);
		const sql_type_arr = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE'];
		if (!R.includes(sql_type, sql_type_arr)) {
			return [];
		}
        let sql_result = null;
        try{
            this.sql_log(sql,data);
            const result = await this.db_coon.query(sql,data);
            const [rows] = result;
            sql_result = rows;
        }catch(error){
            throw new HttpException('error', 500);
        }
        if (!sql_result) {
			return null;
		}
		if (sql_type === 'SELECT') {
            console.log(sql_result);
			return sql_result;
		}
		if (sql_type === 'UPDATE') {
			return sql_result.changedRows;
		}
		if (sql_type === 'INSERT') {
			return sql_result.insertId;
		}
		if (sql_type === 'DELETE') {
			return sql_result.affectedRows;
		}
		if (sql_type === 'CREATE') {
			return sql_result;
		}
    }

    async getAll(sql: string, data: Array<any> = []): Promise<Array<any>>{
        const result = await this.query(sql, data);
        return R.type(result) === 'Array' ? result : [];
    }

    async getRow(sql: string, data: Array<any> = []): Promise<Array<any>>{
        const result = await this.getAll(sql, data);
        return R.propOp({},0,result);
    }

    async update(
        table_name: string, 
        input: object, 
        where_sql: string,
        where_data: Array<any> = [],
    ): Promise<Number>{
        const input_keys = R.keys(input);
        const input_data = R.values(input);
        const set_sql = R.pipe(
            R.map((key) => `${key} = ?`),
            R.join(",")
        )(input_keys);
        const data = R.concat(input_data, where_data);
        const sql = `
        UPDATE ${table_name} set
            ${set_sql}
        WHERE 1=1 and ${where_sql}
        `;
        const result = await this.query(sql, data);
        return R.type(result) === "Number" ? result : 0;
    }

    async insert(table_name: string, input: object): Promise<Number>{
        const input_keys = R.keys(input);
        const input_data = R.values(input);
        const set_sql = R.pipe(
            R.map( (key) => `${key} => ?`),
            R.join(","),
        )(input_keys);

        const sql = `INSERT INTO ${table_name} set ${set_sql}`;
        const result = await this.query(sql, input_data);
        return R.type(result) === "Number" ? result : 0;
    }

	private sql_log(sql, data) {
		if (process.env.NODE_ENV === 'prod') {
			return;
		}
		sql = sql.trim();
		let _sql = mysql.format(sql, data);
		_sql = _sql.replace(/[\t\n]/g, '');
		_sql = _sql.replace(/\s{2,}/g, ' ');
		logger.info(`[sql ] : ${_sql}`);
	}    

}