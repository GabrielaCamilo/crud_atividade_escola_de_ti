import { IsArray, IsInt } from 'class-validator';

export class UpdateItemMagicoDto {
    @IsInt()
    personagemId: number;

    @IsArray()
    tipoItem?: 'Arma' | 'Armadura' | 'Amuleto';
}
