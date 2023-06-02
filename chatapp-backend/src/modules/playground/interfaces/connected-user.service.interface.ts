import { ConnectedUserEntity } from "src/entities/connected-user.entity";
import { ConnectedUserInterface } from "src/entities/interfaces/connected-user.interface";
import { UserInterface } from "src/entities/interfaces/user.interface";

export interface ConnectedUserServiceInterface {
    create(connectedUser: ConnectedUserInterface): Promise<ConnectedUserInterface>;
    getAll(): Promise<ConnectedUserInterface[]>;
    findByUser(user: UserInterface): Promise<ConnectedUserInterface[]>;
    deleteBySocketId(socketId: string): Promise<ConnectedUserEntity>;
    deleteAll(): Promise<void>;
}