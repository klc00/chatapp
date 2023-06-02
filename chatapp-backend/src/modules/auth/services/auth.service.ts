import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { AuthServiceInterface } from '../interfaces/auth.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private jwtService: JwtService
  ) { }

  async generateJwt(payload: any): Promise<string> {
    return this.jwtService.signAsync({ payload }, {
      expiresIn: "10h",
    });
  }

  verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
