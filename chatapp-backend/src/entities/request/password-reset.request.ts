import { IsEmail, IsNotEmpty } from "class-validator";

export class PasswordResetRequest {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    newPassword: string;

    @IsNotEmpty()
    privateKey: string;
}