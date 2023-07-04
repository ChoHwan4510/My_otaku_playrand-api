import { Module } from '@nestjs/common';
import { WordGameService } from './word-game.service';
import { WordGameController } from './word-game.controller';
import { WordGameModel } from '@/model/word.game.model';
@Module({
  controllers: [WordGameController],
  providers: [WordGameService, WordGameModel],
  exports: [WordGameService],
})
export class WordGameModule {}
