import { Test, TestingModule } from '@nestjs/testing';
import { MqmanagerService } from './mqmanager.service';

describe('MqmanagerService', () => {
  let service: MqmanagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqmanagerService],
    }).compile();

    service = module.get<MqmanagerService>(MqmanagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
