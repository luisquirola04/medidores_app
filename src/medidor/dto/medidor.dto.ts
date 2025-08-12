import { Estado } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";
import { IsEnum, IsNumber } from "class-validator";

export class MedidorDTO{

        @Exclude()
        id: number;
    
        @Expose()
        uuid: string;
@Expose()
@IsNumber()
numeroMedidor:number;

@Expose()
@IsNumber()
numeroServicio:number;


@Expose()
@IsNumber()
latitud:number;


@Expose()
@IsNumber()
altitud:number;

@Expose()
@IsEnum(Estado)
enum:Estado

@Exclude()
@IsNumber()
usuarioId: number

@Expose()
@IsEnum(Estado)
estado: Estado;
}