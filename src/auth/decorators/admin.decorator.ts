import { SetMetadata } from "@nestjs/common";
import { Rol } from "@prisma/client";
import { ADMIN_KEY } from "src/constants/keyDecorators";

export const AdminAccess=()=>SetMetadata(ADMIN_KEY,Rol.administrador)