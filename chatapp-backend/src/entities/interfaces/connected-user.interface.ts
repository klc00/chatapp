import { UserInterface } from "./user.interface";

export interface ConnectedUserInterface {
    id?: number;
    socketId?: string;
    user?: UserInterface;
}