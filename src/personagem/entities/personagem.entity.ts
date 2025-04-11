import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateItemMagicoDto } from "src/item_magico/dto/create-item_magico.dto";

export class Personagem {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsString()
    nome: string;

    @IsString()
    nomeAventureiro: string;

    @IsString()
    classe: string;

    @IsNumber()
    level: number;

    @IsArray()
    listaItensMagicos: CreateItemMagicoDto[] = [];

    @IsNumber()
    forca: number;

    @IsNumber()
    defesa: number;

}
