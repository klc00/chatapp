import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterRequest {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    nickname: string;

    @IsNotEmpty()
    privateKey: string;

    @IsNotEmpty()
    photo: string;
}
