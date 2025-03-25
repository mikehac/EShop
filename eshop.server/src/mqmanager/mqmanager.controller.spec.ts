import { Test, TestingModule } from '@nestjs/testing';
import { MqmanagerController } from './mqmanager.controller';

describe('MqmanagerController', () => {
  let controller: MqmanagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MqmanagerController],
    }).compile();

    controller = module.get<MqmanagerController>(MqmanagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
