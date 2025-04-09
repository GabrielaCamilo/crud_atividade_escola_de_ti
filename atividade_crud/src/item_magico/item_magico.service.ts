import { Injectable } from '@nestjs/common';
import { CreateItemMagicoDto } from './dto/create-item_magico.dto';
import { UpdateItemMagicoDto } from './dto/update-item_magico.dto';

@Injectable()
export class ItemMagicoService {

  create(createItemMagicoDto: CreateItemMagicoDto) {
    return 'This action adds a new itemMagico';
  }

  findAll() {
    return `This action returns all itemMagico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemMagico`;
  }

  update(id: number, updateItemMagicoDto: UpdateItemMagicoDto) {
    return `This action updates a #${id} itemMagico`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemMagico`;
  }
}
