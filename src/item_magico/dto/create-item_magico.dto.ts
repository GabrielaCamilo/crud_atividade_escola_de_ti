import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateItemMagicoDto {

  @IsString()
  @ApiProperty({
    description: 'Nome do item',
    example: 'Armadura de fogo',
    type: String,
    })
  nome: string;

  @IsString()
  @IsIn(['Arma', 'Armadura', 'Amuleto'])
  @ApiProperty({
    description: 'Escolha o tipo do item',
    example: 'Arma, Armadura, Amuleto',
    type: String,
  })
  tipoItem:  'Arma' | 'Armadura' | 'Amuleto';

  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty({
    description: 'Pontos de força do item',
    example: 5,
    type: Number,
  })
  forca: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty({
    description: 'Pontos de defesa do item',
    example: 5,
    type: Number,
  })
  defesa: number;

  @IsNumber()
  @ApiProperty({
    description: 'Id do personagem',
    example: 1,
    type: Number,
  })
  personagemId?: number;
}
