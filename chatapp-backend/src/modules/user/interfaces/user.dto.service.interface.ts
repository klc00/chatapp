
import { UserInterface } from "src/entities/interfaces/user.interface";
import { LoginRequest } from "src/entities/request/login.request";
import { PasswordResetRequest } from "src/entities/request/password-reset.request";
import { RegisterRequest } from "src/entities/request/register.request";

export interface UserDtoServiceInterface {
    registerDtoToEntity(registerDto: RegisterRequest): UserInterface;
    loginDtoToEntity(loginDto: LoginRequest): UserInterface;
    passwordResetDtoToEntity(passwordResetDto: PasswordResetRequest): UserInterface;
}