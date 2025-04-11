import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonagemController } from './personagem/personagem.controller';
import { ItemMagicoController } from './item_magico/item_magico.controller';
import { PersonagemService } from './personagem/personagem.service';
import { ItemMagicoService } from './item_magico/item_magico.service';
import { PrismaService } from './prisma/prisma-service';

@Module({
  imports: [],
  controllers: [AppController, PersonagemController,ItemMagicoController],
  providers: [AppService,PersonagemService,ItemMagicoService,PrismaService],
  exports: [PersonagemService],
})
export class AppModule {}
