import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ItemMagico {
        @IsNotEmpty()
        @IsNumber()
        id: number;
    
        @IsString()
        nome: string;
    
        @IsString()
        tipoItem: 'Arma' | 'Armadura' | 'Amuleto';
    
        @IsNumber()
        forca: number;
    
        @IsNumber()
        defesa: number;

        personagemId: number;
}
