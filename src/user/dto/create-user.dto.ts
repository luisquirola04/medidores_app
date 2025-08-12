import { Rol } from "@prisma/client";
import { IsEmail, IsEnum, IsNumber, IsString, Max, MaxLength } from "class-validator"


export class CreateUserDto{
@IsString()
@MaxLength(60,{message: "Los nombres ingresados son demasiado largos, recuerde ingresar unicamente sus nombres"})
names:string;


@IsString()
@MaxLength(60,{message: "Los apellidos ingresados son demasiado largos, recuerde ingresar unicamente sus apellidos"})
lastNames:string;

@IsNumber()
@Max(9999999999,{message: "Recuerde que el dni unicaemnte tiene 10 digitos"})
dni:number;

@IsString()
@MaxLength(100)
address:string;


@IsEmail()
@IsString()
email:string;

@MaxLength(50)
@IsString()
password:string;

@IsEnum(Rol)
rol: Rol; 


}