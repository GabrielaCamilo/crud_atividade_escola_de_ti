import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Personagem {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsString()
    nome: String;

    @IsString()
    nomeAventureiro: String;

    @IsString()
    classe: String;

    @IsNumber()
    level: number;

    @IsArray()
    listaItensMagicos: [];

    @IsNumber()
    forca: number;

    @IsNumber()
    defesa: string;



}
