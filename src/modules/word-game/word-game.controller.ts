import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Query } from '@nestjs/common';
import { WordGameService } from './word-game.service';
import { SearchWordGameDto } from './dto/search-word-game.dto';
import { json_response } from '@/lib/json_response';

@Controller('word-game')
export class WordGameController {
  constructor(private readonly wordGameService: WordGameService) {}

  @Get('list')
  async word_list(@Query() dto:SearchWordGameDto, @Res() res) {
    const {qw_genre, qw_level} = dto;

    const list = await this.wordGameService.word_list(dto);
    return json_response(res, 200, '', list);
  }

}
