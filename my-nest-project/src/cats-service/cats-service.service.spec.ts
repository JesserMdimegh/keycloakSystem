import { Test, TestingModule } from '@nestjs/testing';
import { CatsServiceService } from './cats-service.service';

describe('CatsServiceService', () => {
  let service: CatsServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsServiceService],
    }).compile();

    service = module.get<CatsServiceService>(CatsServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
