import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, HttpCode } from '@nestjs/common';
import { ItemMagicoService } from './item_magico.service';
import { CreateItemMagicoDto } from './dto/create-item_magico.dto';
import { UpdateItemMagicoDto } from './dto/update-item_magico.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('item-magico')
export class ItemMagicoController {
  constructor(private readonly itemMagicoService: ItemMagicoService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('criar')
  @ApiOperation({ summary: 'Criar item mágico'})
  @ApiResponse({ status: 200, description:'Sucesso'})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiBody({ type: CreateItemMagicoDto })
  create(@Body() createItemMagicoDto: CreateItemMagicoDto) {
    return this.itemMagicoService.criarUmItemMagico(createItemMagicoDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('procurar-varios')
  @ApiOperation({ summary: 'Procura vários itens mágicos' })
  @ApiResponse({ status: 200, description:'Successo'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  findAll() {
    return this.itemMagicoService.acharTodosOsItens();
  }

  @HttpCode(HttpStatus.OK)
  @Get('procurar/:id')
  @ApiOperation({ summary: 'Acha um item mágico pelo id'})
  @ApiResponse({ status: 200, description:'Successo'})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  findOne(@Param('id') idItem: string) {
    return this.itemMagicoService.acharUmItemPeloId(+idItem);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('adicionar/:idItem')
  @ApiOperation({ summary: 'Adiciona um item mágico ao personagem'})
  @ApiResponse({ status: 200, description:'Successo'})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiParam({ name: 'idItem', type: Number, description: 'ID do item mágico a ser adicionado ao personagem' })
  @ApiBody({
    type: UpdateItemMagicoDto,
    examples: {
      exemplo1: {
        summary: 'Adicionar amuleto ao personagem',
        value: {
          personagemId: 1,
          tipoItem: 'Amuleto'
        }
      }
    }
  })
  update(@Param('idItem') idItem: string, @Body() updateItemMagicoDto: UpdateItemMagicoDto) {
    return this.itemMagicoService.adicionarItemAoPersonagem(+idItem, updateItemMagicoDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('itens/:idPersonagem')
  @ApiOperation({ summary: 'Acha Todos os itens mágicos do personagem'})
  @ApiResponse({ status: 200, description:'Successo'})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  acharTodosOsItensPersonagem(@Param('idPersonagem') idPersonagem: string) {
    return this.itemMagicoService.acharTodosOsItensPersonagem(+idPersonagem);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':idItem/personagem/:idPersonagem')
  @ApiOperation({ summary: 'Delete um item mágico pelo Id' })
  @ApiResponse({ status: 200, description:'Successo'})
  @ApiResponse({status:400, description: 'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @ApiParam({ name: 'idItem', type: Number, description: 'ID do item' })
  @ApiParam({ name: 'idPersonagem', type: Number, description: 'ID do personagem' })
  remove(
    @Param('idItem') idItem: string,
    @Param('idPersonagem') idPersonagem: string,)
    {
    return this.itemMagicoService.removerItem(Number(idItem), Number(idPersonagem));
  }

  @HttpCode(HttpStatus.OK)
  @Get('procurarAmuleto/:idItemAmuleto/:idPersonagem')
  @ApiOperation({ summary: 'Acha o Amuleto do personagem'})
  @ApiResponse({ status: 200, description:'Successo'})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiParam({ name: 'idPersonagem', type: Number, description: 'ID do personagem' })
  @ApiParam({ name: 'idItemAmuleto', type: Number, description: 'ID do item amuleto' })
  procurarAmuleto(
    @Param('idPersonagem') idPersonagem : number,
    @Param('idItemAmuleto') idItemAmuleto: number
  ) {
    return this.itemMagicoService.procurarAmuleto(+idPersonagem, +idItemAmuleto);
  }
}
