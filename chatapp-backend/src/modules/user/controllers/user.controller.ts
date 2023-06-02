import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Body, Inject } from '@nestjs/common/decorators';
import { UserInterface } from 'src/entities/interfaces/user.interface';
import { LoginRequest } from 'src/entities/request/login.request';
import { PasswordResetRequest } from 'src/entities/request/password-reset.request';
import { RegisterRequest } from 'src/entities/request/register.request';
import { LoginResponseInterface } from 'src/entities/response/login.response.interface';
import { PasswordResetResponseInterface } from 'src/entities/response/password-reset.response.interface';
import { ProfileResponseInterface } from 'src/entities/response/profile.response.interface';
import { RegisterResponseInterface } from 'src/entities/response/register.response.interface';
import { Routes, Services } from 'src/utilities/constants';
import { JwtAuthGuard } from 'src/utilities/security/guards/jwt-auth.guard';
import { UserDtoServiceInterface } from '../interfaces/user.dto.service.interface';
import { UserServiceInterface } from '../interfaces/user.service.interface';

@Controller(Routes.USER)
export class UserController {
  constructor(
    @Inject(Services.UserServiceInterface)
    private readonly userService: UserServiceInterface,
    @Inject(Services.UserDtoServiceInterface)
    private readonly userDtoService: UserDtoServiceInterface,
  ) { }

  @Post('login')
  async login(@Body() req: LoginRequest): Promise<LoginResponseInterface> {
    const user: UserInterface = this.userDtoService.loginDtoToEntity(req);
    const jwt: string = await this.userService.login(user);
    return {
      access_token: jwt,
      token_type: "JWT",
      expires_in: 10000,
    };
  }

  @Post('register')
  async register(@Body() req: RegisterRequest): Promise<RegisterResponseInterface> {
    const user: UserInterface = this.userDtoService.registerDtoToEntity(req);
    const res = await this.userService.register(user);
    return {
      id: res.id,
      email: res.email,
      nickname: res.nickname,
      photo: res.photo,
    };
  }

  @Post('resetpassword')
  async resetpassword(@Body() req: PasswordResetRequest): Promise<PasswordResetResponseInterface> {
    const user: UserInterface = this.userDtoService.passwordResetDtoToEntity(req);
    const result = await this.userService.resetPassword(user);
    return {
      success: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<ProfileResponseInterface> {
    const tempUser = await this.userService.findById(req.user.userId);
    return {
      id: tempUser.id,
      email: tempUser.email,
      nickname: tempUser.nickname,
      photo: tempUser.photo,
    };
  }

}
