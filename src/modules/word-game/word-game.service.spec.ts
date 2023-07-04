import { Test, TestingModule } from '@nestjs/testing';
import { WordGameService } from './word-game.service';

describe('WordGameService', () => {
  let service: WordGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordGameService],
    }).compile();

    service = module.get<WordGameService>(WordGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
