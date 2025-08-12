import { SetMetadata } from "@nestjs/common";
import { PUBLIC_KEY } from "src/constants/keyDecorators";

export const PublicAccess=()=>SetMetadata(PUBLIC_KEY,true)