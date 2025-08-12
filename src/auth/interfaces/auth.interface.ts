import { Rol } from "@prisma/client";

export interface PayloadToken{
    sub:string;
    role: Rol;
    names: string;
}

export interface AuthTokenResult{
    role:string;
    sub:string;
    names:string;
    iat:number;
    exp:number;
}

export interface UseToken{
    role:string;
    sub:string;
    names:string;
    isExpired: boolean;
}