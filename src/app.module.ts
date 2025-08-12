import { Module } from '@nestjs/common';
import { MedidorModule } from './medidor/medidor.module';
import { MedidorService } from './medidor/medidor.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ MedidorModule, UserModule, AuthModule,],
  providers: [],
})
export class AppModule {}

//nest generate module medidor