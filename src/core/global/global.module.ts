import { Global, Module } from '@nestjs/common';
import { Model } from '../model/data.model';
// import { RedisModel } from '../model/redis.model';

@Global()
@Module({
	imports: [],
	providers: [Model],
	exports: [Model],
})
export class GlobalModule {}
