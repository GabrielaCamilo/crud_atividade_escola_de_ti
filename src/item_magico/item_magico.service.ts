import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemMagicoDto } from './dto/create-item_magico.dto';
import { UpdateItemMagicoDto } from './dto/update-item_magico.dto';
import { PrismaService } from 'src/prisma/prisma-service';
import { ItemMagico } from './entities/item_magico.entity';

@Injectable()
export class ItemMagicoService {
  constructor(private prisma: PrismaService) {}

  async criarUmItemMagico(createItemMagicoDto: CreateItemMagicoDto) {
    const tipoItensMagicos = ['Arma' , 'Armadura' , 'Amuleto' ]

    if(!tipoItensMagicos.includes(createItemMagicoDto.tipoItem) ){
      throw new BadRequestException('O tipo do item mágico não existe')
    };

    const totalPontosItem = createItemMagicoDto.forca + createItemMagicoDto.defesa;
    if (totalPontosItem > 10){
      throw new BadRequestException(" Os atributos Força e Defesa podem ser no máximo 10 pontos ")
    };

    if(createItemMagicoDto.forca <= 0 && createItemMagicoDto.defesa <= 0 ){
      throw new BadRequestException(" Os itens devem ter de 1 a 10 de força e defesa! ")
    }

    if( createItemMagicoDto.tipoItem === 'Arma' && createItemMagicoDto.defesa !== 0){
      throw new BadRequestException("A defesa do item do tipo Arma é obrigatoriamente ser zero")
    };

    if( createItemMagicoDto.tipoItem === 'Armadura' && createItemMagicoDto.forca !== 0){
      throw new BadRequestException("A força do item do tipo Armadura é obrigatoriamente ser zero")
    };

    if( createItemMagicoDto.tipoItem === 'Amuleto' && createItemMagicoDto.personagemId){
      const jaTemAmuleto = await this.prisma.itemMagico.findFirst({
        where: {
          tipoItem: 'Amuleto',
          personagemId: createItemMagicoDto.personagemId,
        }
      });
      if(jaTemAmuleto){
        throw new BadRequestException('O personagem já possui um item do tipo amuleto');
      }
    }

    const novoItemMagico = await this.prisma.itemMagico.create({
      data:{
        ...createItemMagicoDto,
      }
    });
    return novoItemMagico;
  }

  async acharTodosOsItens() {
    const todosOsItensMagicos = await this.prisma.itemMagico.findMany({
      select:{
        id: true,
        nome: true,
        tipoItem: true,
        forca: true,
        defesa: true,
      }
    });
    return todosOsItensMagicos;
  }

  async acharUmItemPeloId(idItem: number) {
    const acharUmItem = await this.prisma.itemMagico.findFirst({
      where: { id : idItem},
      select:{
        id: true,
        nome: true,
        tipoItem: true,
        forca: true,
        defesa: true,
      }
    });
    if(!acharUmItem){
      throw new BadRequestException('Item não encontrado!')
    }
    return acharUmItem;
  }

  async adicionarItemAoPersonagem(idItem: number, updateItemMagicoDto: UpdateItemMagicoDto) {

    const personagem = await this.prisma.personagem.findUnique({
      where:{ id: updateItemMagicoDto.personagemId } 
    });
    if(!personagem){
      throw new BadRequestException('Personagem não foi encontrado!')
    }

    if( updateItemMagicoDto.tipoItem === 'Amuleto' && updateItemMagicoDto.personagemId){
      const jaTemAmuleto = await this.prisma.itemMagico.findFirst({
        where: {
          tipoItem: 'Amuleto',
          personagemId: updateItemMagicoDto.personagemId,
        }
      });
      if(jaTemAmuleto){
        throw new BadRequestException('O personagem já possui um item do tipo amuleto');
      }
    }

    const itemM = await this.prisma.itemMagico.update({
      where: { id: idItem },
      data: {
        personagem: { connect: { id: updateItemMagicoDto.personagemId }},
      },
    });
    return itemM;
  }

  async acharTodosOsItensPersonagem(idPersonagem: number) {
    return this.prisma.itemMagico.findMany({
      where: { personagemId: idPersonagem },
    });
  }
  
  async removerItem(idItem: number, idPersonagem: number) {
    const item = await this.prisma.itemMagico.findFirst({
      where:{ 
        id: idItem,
        personagemId: idPersonagem,
      }
    });

    if(!item){
      throw new BadRequestException('Item mágico não encontrado neste personagem!')
    }

    await this.prisma.itemMagico.delete({
      where:{ 
        id: item.id 
      }
    });
    return {message: 'Item removido com sucesso'};
  }

  async procurarAmuleto(idPersonagem: number, idItemAmuleto: number){
    const acharAmuleto = await this.prisma.itemMagico.findFirst({
      where: { 
        personagemId: idPersonagem, 
        id: idItemAmuleto,
        tipoItem: 'Amuleto',
      },
    });
    if (!acharAmuleto) {
      throw new BadRequestException('Amuleto não encontrado para este personagem!');
    }
    return acharAmuleto;
  }
  
}
