import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';
import path from 'path';
import * as R from 'ramda';
import moment from 'moment';

const { combine, timestamp, printf, colorize } = winston.format;

const logDir = 'logs';

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'blue',
};
winston.addColors(colors);

const level = () => {
	const env = process.env.NODE_ENV || 'dev';
	const isDevelopment = env === 'dev';
	return isDevelopment ? 'debug' : 'http';
};

// Log Format
const logFormat = combine(
	timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
	printf((info) => {
		const { message } = info;
		let is_obj = R.pipe(R.type, R.includes(R.__, ['Object', 'Array']))(message);
		const msg = is_obj ? JSON.stringify(message) : message;
		if (info.stack) {
			return `[${info.timestamp}][${info.level}]: ${msg} \n Error Stack: ${info.stack}`;
		}
		return `[${info.timestamp}][${info.level}]: ${msg}`;
	}),
);

// 콘솔에 찍힐 때는 색깔을 구변해서 로깅해주자.
const consoleOpts = {
	handleExceptions: true,
	level: process.env.NODE_ENV === 'prod' ? 'error' : 'debug',
	format: combine(
		colorize({ all: true }),
		timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
		// winston.format.json(),
	),
};
let transports: any = [new winston.transports.Console(consoleOpts)];
const date = moment().format('YYYY-MM-DD');
if (process.env.NODE_ENV === 'prod') {
	transports = [
		// 콘솔로그찍을 때만 색넣자.
		new winston.transports.Console(consoleOpts),
		// error 레벨 로그를 저장할 파일 설정
		new WinstonDaily({
			level: 'error',
			datePattern: 'YYYY-MM-DD',
			// dirname: path.join(__dirname, logDir, '/error'),
			dirname: path.join(logDir, date, 'error'),
			filename: '%DATE%.error.log',
			maxFiles: 30,
			zippedArchive: true,
		}),
		// 모든 레벨 로그를 저장할 파일 설정
		new WinstonDaily({
			level: 'debug',
			datePattern: 'YYYY-MM-DD',
			dirname: path.join(logDir, date, 'all'),
			filename: '%DATE%.all.log',
			maxFiles: 7,
			zippedArchive: true,
		}),
	];
}

const logger = winston.createLogger({
	level: level(),
	levels,
	format: logFormat,
	transports,
});

export { logger };
