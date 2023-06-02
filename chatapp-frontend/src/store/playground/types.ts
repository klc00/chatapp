import { MessageInterface } from "@/entities/interfaces/message.interface";
import { UserInterface } from "@/entities/interfaces/user.interface";

export interface PlaygroundState {
    onlineUsers: UserInterface[];
    tempMessages: MessageInterface[];
    selectUser: UserInterface | null,
}