import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateItemMagicoDto } from "src/item_magico/dto/create-item_magico.dto";

export class CreatePersonagemDto {

    @IsString()
    @ApiProperty({
        description: 'Informe o seu nome',
        example: 'Maria',
        type: String,
      })
    nome: string;

    @IsString()
    @ApiProperty({
        description: 'Informe o seu nome de aventura',
        example: 'Eragon',
        type: String,
      })
    nomeAventureiro: string;

    @IsString()
    @ApiProperty({
        description: 'Escolha sua classe',
        example: 'Guerreiro, Mago, Arqueiro, Ladino, Bardo',
        type: String,
      })
    classe: 'Guerreiro' | 'Mago' | 'Arqueiro' | 'Ladino' | 'Bardo';
      

    @IsNumber()
    @ApiProperty({
      description: 'Pontos de força',
      example: 5,
      type: Number,
    })
    forca: number;

    @IsNumber()
    @ApiProperty({
      description: 'Pontos de Defesa',
      example: 5,
      type: Number,
    })
    defesa: number;



}
