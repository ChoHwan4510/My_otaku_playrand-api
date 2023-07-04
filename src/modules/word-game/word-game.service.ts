import { Injectable } from '@nestjs/common';
import { WordGameDto } from './dto/word-game.dto';
import { SearchWordGameDto } from './dto/search-word-game.dto';
import { WordGameModel } from '@/model/word.game.model';

@Injectable()
export class WordGameService {
  constructor(private WordGameModel: WordGameModel){}

  create(WordGameDto: WordGameDto) {
    return 'This action adds a new wordGame';
  }

  async word_list(dto: SearchWordGameDto ) {
    return await this.WordGameModel.get_word_list_all(dto);
  }

}
