import { SetMetadata } from "@nestjs/common";
import { Rol } from "@prisma/client";
import { USER_KEY } from "src/constants/keyDecorators";

export const UserAccess=()=>SetMetadata(USER_KEY,Rol.usuario)