import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ItemMagico {
        @IsNotEmpty()
        @IsNumber()
        id: number;
    
        @IsString()
        nome: String;
    
        @IsString()
        tipoItem: String;
    
        @IsNumber()
        forca: number;
    
        @IsNumber()
        defesa: number;
}
