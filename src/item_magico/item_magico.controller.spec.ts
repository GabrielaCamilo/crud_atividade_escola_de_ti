import { Test, TestingModule } from '@nestjs/testing';
import { ItemMagicoController } from './item_magico.controller';
import { ItemMagicoService } from './item_magico.service';

describe('ItemMagicoController', () => {
  let controller: ItemMagicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemMagicoController],
      providers: [ItemMagicoService],
    }).compile();

    controller = module.get<ItemMagicoController>(ItemMagicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
