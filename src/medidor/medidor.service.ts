import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateMedidorDTO } from "./dto/create-medidor.dto";
import { MedidorDTO } from "./dto/medidor.dto";
import { plainToInstance } from "class-transformer";
import { map } from "rxjs";
import { Estado } from "@prisma/client";

@Injectable()
export class MedidorService {

    constructor(private prisma: PrismaService) { }


    async getMedidorByUser(userUuid: string) {
        const user = await this.prisma.usuario.findFirst({ where: { uuid: userUuid } });
        if (!user) {
            throw new Error("No existe el usuario");
        }
        const response = await this.prisma.medidor.findMany({ where: { usuarioId: user.id , estado : Estado.FUNCIONANDO} });
        const medidores = plainToInstance(MedidorDTO, response, {
            excludeExtraneousValues: true,
        });
        return { medidores, code: 200 };
        //const medidores = search.map()
    }

    async createMedidor(medidor: CreateMedidorDTO) {
        const medidorExist = await this.prisma.medidor.findFirst({ where: { numeroMedidor: medidor.numeroMedidor } })
        if (medidorExist) {
            throw new Error("Este medidor ya existe");
        }
        const user = await this.prisma.usuario.findFirst({ where: { uuid: medidor.usuarioId } })
        if (!user) {
            throw new Error("Este usuario no existe");
        }
        try {
            const newMedidor = await this.prisma.medidor.create({
                data: {
                    numeroMedidor: medidor.numeroMedidor,
                    numeroServicio: medidor.numeroServicio,
                    latitud: medidor.latitud,
                    altitud: medidor.altitud,
                    estado: medidor.enum,
                    usuarioId: user.id
                },
            });
            const new_medidor = plainToInstance(MedidorDTO, newMedidor, {
                excludeExtraneousValues: true,
            });
            return { code: 200, new_medidor };
        } catch (error) {
            throw new Error("Error en guardar medidor -> " + error.message);
        }
    }


    async calculoValores(uuidMedidor: string) {
        console.log(uuidMedidor);
        const medidor = await this.prisma.medidor.findFirst({ where: { uuid: uuidMedidor } });
        if (!medidor) {
            throw new Error("No existe el medidor");
        }
        const lecturas = await this.prisma.lectura.findMany({ where: { medidorId: medidor.id }, select: { valorConsumo: true } });
        const valores = lecturas.map(l => l.valorConsumo);

        let sum = 0;
        for (let index = 0; index < valores.length; index++) {
            sum += valores[index];
        }
        return { valoresTotal: sum, code: 200 };
    }
}
// nest generate service medidor --no-spec