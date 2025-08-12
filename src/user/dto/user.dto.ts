import { Rol } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserDto {
    @Exclude()
    id: number;

    @Expose()
    uuid: string;

    @Expose()
    name: string;

    @Expose()
    last_names: string;

    @Expose()
    dni: number;

    @Expose()
    address: string;

    @Expose()
    email: string;

    @Expose()
    rol: Rol;

    @Exclude()
    password: string;

    @Expose()
    state:boolean

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}
