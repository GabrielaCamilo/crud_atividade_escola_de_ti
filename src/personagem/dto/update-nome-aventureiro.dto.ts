import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class updateNomeAventureiro{
    @IsString()
    @ApiProperty({
        description: 'Informe seu nome de Guerreiro',
        example: 'Feiticeira Escarlate',
        type: String,
      })
    nomeAventureiro?: string;
}