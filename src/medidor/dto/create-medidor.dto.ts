import { Estado } from "@prisma/client";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateMedidorDTO{
@IsNumber()
numeroMedidor:number;


@IsNumber()
numeroServicio:number;

@IsNumber()
latitud:number;

@IsNumber()
altitud:number;


@IsEnum(Estado)
enum:Estado

@IsString()
usuarioId:string
}