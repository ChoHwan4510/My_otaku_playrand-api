import moment from 'moment';
import * as R from 'ramda';
export const json_response = (
	res: { status; json },
	statusCode = 200,
	msg: string | string[] = '',
	data: object = {},
	code = '0000',
) => {
	const errmsgs = R.type(msg) === 'Array' ? msg : [msg];
	const errmsg = R.type(msg) === 'Array' ? msg[0] : msg;
	const datetime = moment().format('YYYY-MM-DD HH:mm:ss');
	const obj = {
		statusCode,
		errmsg,
		errmsgs,
		code,
		datetime,
		...data,
	};
	res.status(statusCode).json(obj);
};
