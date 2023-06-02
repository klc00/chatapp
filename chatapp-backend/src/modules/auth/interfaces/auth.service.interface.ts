export interface AuthServiceInterface {
  generateJwt(payload: any): Promise<string>;
  verifyJwt(jwt: string): Promise<any>;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, passwordHash: string): Promise<boolean>;
}