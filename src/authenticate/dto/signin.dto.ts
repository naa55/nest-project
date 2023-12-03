import { IsNotEmpty, IsString } from "class-validator";

export class Sign {
    @IsString()
    @IsNotEmpty()
    email: string


}