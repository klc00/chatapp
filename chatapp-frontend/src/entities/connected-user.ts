import { User } from "./user";


export class ConnectedUser {
  id: number;
  socketId: string;
  user: User;

  constructor(
    id: number,
    socketId: string,
    user: User,
  ) {
    this.id = id;
    this.socketId = socketId;
    this.user = user;
  }
}