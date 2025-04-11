import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdatePersonagemDto } from './dto/update-personagem.dto';
import { PrismaService } from 'src/prisma/prisma-service';
import { updateNomeAventureiro } from './dto/update-nome-aventureiro.dto';
import { ItemMagico } from 'src/item_magico/entities/item_magico.entity';

@Injectable()
export class PersonagemService {
  constructor(private prisma: PrismaService) {}

  async criarPersonagem(createPersonagemDto: CreatePersonagemDto) {

    const PontosTotal = createPersonagemDto.forca + createPersonagemDto.defesa;
      if( PontosTotal > 10){
        throw new BadRequestException('Seu limite de pontos no total para força e defesa é 10!')
      };

    const classesDisponiveis = ['Guerreiro' , 'Mago' , 'Arqueiro' , 'Ladino' , 'Bardo' ]

      if(!classesDisponiveis.includes(createPersonagemDto.classe) ){
        throw new BadRequestException('O personagem não pode ter essa classe! classes disponiveis: Guerreiro, Mago, Arqueiro, Ladino e Bardo')
      };
      
    const novoPersonagem = await this.prisma.personagem.create({
      data:{
        level: 1,
        ...createPersonagemDto
      }
    });

    return novoPersonagem;
  }

  async acharTodosPersonagens() {
    const personagens = await this.prisma.personagem.findMany({
      select:{
        id: true,
        nome: true,
        nomeAventureiro: true,
        classe: true,
        level: true,
        listaItensMagicos: true,
        forca: true,
        defesa: true,
      }
    });
    return personagens;
  }

  async acharUmPersonagem(idPersonagem: number) {

    const personagem = await this.prisma.personagem.findUnique({
      where: { id : idPersonagem },
      include:{ listaItensMagicos: true },
      });
      if (!personagem) {
        throw new BadRequestException('Personagem não encontrado');
      }

      let forcaItens = 0;
      let defesaItens = 0;
    
      for (const item of personagem.listaItensMagicos) {
        forcaItens += item.forca || 0;
        defesaItens += item.defesa || 0;
      }
      return {
        nome: personagem.nome,
        nomeAventureiro: personagem.nomeAventureiro,
        classe: personagem.classe,
        level: personagem.level,
        listaItensMagicos: personagem.listaItensMagicos,
        forcaTotal: personagem.forca + forcaItens,
        defesaTotal: personagem.defesa + defesaItens,
        }
      }

  async updateNomeAventureiro(idPersonagem: number, updateNomeAventureiro: updateNomeAventureiro) {
    await this.prisma.personagem.update({
      where: { id: idPersonagem},
      data:{
        ...updateNomeAventureiro
       },
    });
    return true;
  }

  async deletePersonagem(idPersonagem: number) {
    await this.prisma.personagem.delete({
      where:{ id: idPersonagem},
    });
    return true;
    }
  }

