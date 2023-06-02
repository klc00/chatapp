import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserRepositoryInterface } from 'src/database/interfaces/user.repository.interface';

import { Services } from 'src/utilities/constants';
import { UserServiceInterface } from '../interfaces/user.service.interface';
import { AuthServiceInterface } from 'src/modules/auth/interfaces/auth.service.interface';
import { UserInterface } from 'src/entities/interfaces/user.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(Services.UserRepositoryInterface)
    private readonly userRepository: UserRepositoryInterface,
    @Inject(Services.AuthServiceInterface)
    private readonly authService: AuthServiceInterface,
  ) { }

  public async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!await this.authService.comparePassword(password, user.password)) throw new HttpException('Login was not Successfulll', HttpStatus.UNAUTHORIZED);

    return user;
  }

  async login(user: UserInterface): Promise<string> {
    const tempUser = await this.validateUser(user.email, user.password);
    const payload = { sub: tempUser.id };
    return this.authService.generateJwt(payload);

  }

  async register(user: UserInterface): Promise<UserEntity> {
    const tempUser = await this.userRepository.findByCondition({
      where: [
        { email: user.email },
        { nickname: user.nickname }
      ]
    });

    if (tempUser) throw new HttpException('Email or nickname already in use', HttpStatus.CONFLICT);

    const hashedPassword = await this.authService.hashPassword(user.password);
    const hashedPrivateKey = await this.authService.hashPassword(user.privateKey);


    const newUser = await this.userRepository.save({
      email: user.email,
      nickname: user.nickname,
      password: hashedPassword,
      privateKey: hashedPrivateKey,
      photo: user.photo,
    });

    delete newUser.privateKey;
    delete newUser.password;

    return newUser;
  }

  async resetPassword(user: UserInterface): Promise<boolean> {
    const tempUser = await this.findByEmail(user.email);
    if (!tempUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!await this.authService.comparePassword(user.privateKey, tempUser.privateKey)) throw new HttpException('Private Key invalid', HttpStatus.BAD_REQUEST);

    await this.changePassword(user.email, user.password);
    return true;
  }

  async changePassword(email: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findByCondition({ where: { email } });
    if (!user) throw new HttpException('Email or nickname already in use', HttpStatus.CONFLICT);
    this.userRepository.save({
      ...user,
      password: await this.authService.hashPassword(newPassword),
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findByCondition({ where: { email } });
  }
  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findByCondition({ where: { id } });
  }
}
