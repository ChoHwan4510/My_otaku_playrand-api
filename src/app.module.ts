import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordGameModule } from './modules/word-game/word-game.module';
import { GlobalModule } from './core/global/global.module';

@Module({
  imports: [
    WordGameModule,
    GlobalModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
