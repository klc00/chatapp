import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/entities/interfaces/user.interface';
import { LoginRequest } from 'src/entities/request/login.request';
import { PasswordResetRequest } from 'src/entities/request/password-reset.request';
import { RegisterRequest } from 'src/entities/request/register.request';
import { UserDtoServiceInterface } from '../interfaces/user.dto.service.interface';

@Injectable()
export class UserDtoService implements UserDtoServiceInterface {

    registerDtoToEntity(req: RegisterRequest): UserInterface {
        return {
            email: req.email,
            nickname: req.nickname,
            password: req.password,
            privateKey: req.privateKey,
            photo: req.photo,
        };
    }

    loginDtoToEntity(req: LoginRequest): UserInterface {
        return {
            email: req.email,
            password: req.password,
        };
    }
    passwordResetDtoToEntity(req: PasswordResetRequest): UserInterface {
        return {
            email: req.email,
            privateKey: req.privateKey,
            password: req.newPassword,
        };
    }

}
