import { UnauthorizedException } from "@nestjs/common";
import { AuthTokenResult, UseToken } from "src/auth/interfaces/auth.interface";
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): UseToken | string => {
    try {
        const decode = jwt.decode(token) as AuthTokenResult;
        const currentDate = new Date();
        const expiresDate = new Date(decode.exp);

        return {
            sub: decode.sub, 
            role: decode.role, 
            names:decode.names, 
            isExpired: +expiresDate <= +currentDate /1000
        }

    } catch (error) {
        return "Token is invalid"
    }
}