import { UserInterface } from "src/entities/interfaces/user.interface";
import { UserEntity } from "src/entities/user.entity";

export interface UserServiceInterface {
    validateUser(email: string, password: string): Promise<UserEntity>;
    login(user: UserInterface): Promise<string>;
    register(user: UserInterface): Promise<UserEntity>;
    resetPassword(user: UserInterface): Promise<boolean>;
    changePassword(email: string, newPassword: string): Promise<void>;
    findByEmail(email: string): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity>;
}