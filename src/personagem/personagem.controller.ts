import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { updateNomeAventureiro } from './dto/update-nome-aventureiro.dto';

@ApiTags('Personagem')
@Controller('personagem')
export class PersonagemController {
  constructor(private readonly personagemService: PersonagemService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('criar')
  @ApiOperation({ summary: 'Criar Personagem'})
  @ApiResponse({ status: 200, description:'Sucesso'})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  create(@Body() createPersonagemDto: CreatePersonagemDto) {
    return this.personagemService.criarPersonagem(createPersonagemDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('procurar-varios-personagens')
  @ApiOperation({ summary: 'Procura vários personagens' })
  @ApiResponse({ status: 200, description:'Successo'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  findAll() {
    return this.personagemService.acharTodosPersonagens();
  }

  @HttpCode(HttpStatus.OK)
  @Get('procurar/:id')
  @ApiOperation({ summary: 'Acha um personagem pelo id'})
  @ApiResponse({ status: 200, description:'Successo'})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  findOne(@Param('id') idPersonagem: string) {
    return this.personagemService.acharUmPersonagem(+idPersonagem);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update/:id')
  @ApiOperation({ summary: 'Atualiza o nome de Aventureiro do personagem' })
  @ApiResponse({ status: 200, description:'Successo'})
  @ApiResponse({status:400, description: 'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  update(
  @Param('id') idPersonagem: string, 
  @Body() updateNomeAventureiro: updateNomeAventureiro) {
    return this.personagemService.updateNomeAventureiro(+idPersonagem, updateNomeAventureiro);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Deleta um personagem pelo Id' })
  @ApiResponse({ status: 200, description:'Successo'})
  @ApiResponse({status:400, description: 'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  remove(@Param('id') idPersonagem: string) {
    return this.personagemService.deletePersonagem(+idPersonagem);
  }
}
