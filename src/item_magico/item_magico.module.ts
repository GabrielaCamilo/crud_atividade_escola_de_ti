import { Module } from '@nestjs/common';
import { ItemMagicoService } from './item_magico.service';
import { ItemMagicoController } from './item_magico.controller';

@Module({
  controllers: [ItemMagicoController],
  providers: [ItemMagicoService],
})
export class ItemMagicoModule {}
