import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MedidorService } from './medidor.service';
import { CreateMedidorDTO } from './dto/create-medidor.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('medidor')
@UseGuards(AuthGuard, RolesGuard)
export class MedidorController {
    //Se debe crear para poder usar el service
    medidorService: MedidorService;
    constructor(medidorService: MedidorService) {
        this.medidorService = medidorService;
    }
    //metodo get. usando el metodo del servicio
    @Get("/getV/:uuidMedidor")
    getValues(@Param('uuidMedidor') uuidMedidor:string) {
        return this.medidorService.calculoValores(uuidMedidor);
    }
    @Get("/getMedidores/:uuidUser")
    getMedidorUser(@Param('uuidUser') uuidUser:string) {
        return this.medidorService.getMedidorByUser(uuidUser);
    }
    @Post("/create")
    createMedidor(@Body() medidor: CreateMedidorDTO) {
        return this.medidorService.createMedidor(medidor);
    }

    //mandar get convalores
    /*
    @Get("/getId:id")
    getValoresId(@Param('id') id:Number) {
        return this.medidorService.get(id);
    }
        */


}
