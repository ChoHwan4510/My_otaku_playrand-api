import { Test, TestingModule } from '@nestjs/testing';
import { WordGameController } from './word-game.controller';
import { WordGameService } from './word-game.service';

describe('WordGameController', () => {
  let controller: WordGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordGameController],
      providers: [WordGameService],
    }).compile();

    controller = module.get<WordGameController>(WordGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
