import { IsNotEmpty, MinLength } from "class-validator";


export class CreateAuthDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    is_admin: boolean;
}