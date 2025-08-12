import { Module } from '@nestjs/common';
import { MedidorController } from './medidor.controller';
import { MedidorService } from './medidor.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MedidorController],
  providers: [MedidorService, PrismaService]
})
export class MedidorModule {}


//para crear el controlador--> nest generate controller medidor --no-spec
