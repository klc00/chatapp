import { ConnectedUserInterface } from "@/entities/interfaces/connected-user.interface";
import { MessageInterface } from "@/entities/interfaces/message.interface";
import { CreateMessageRequestInterface } from "@/entities/request/create-message.request.interface";
import store from "@/store";
import { io, Socket } from "socket.io-client";

export class SocketService {
    private socket: Socket = io("ws://localhost:3001/playground", {
        autoConnect: false,
        extraHeaders: {
            "authorization": localStorage.getItem('access_token') as string ?? ""
        },
    });

    connect() {
        this.socket.connect();
    }

    disConnect() {
        this.socket.disconnect();
    }

    listen() {
        this.socket.on('onlineUserAll', (data: ConnectedUserInterface[]) => {
            store.commit('onlineUserAll', data)
        })
        this.socket.on('messageList', (data: MessageInterface[]) => {
            store.commit('messageList', data)
        })
        this.socket.on('newMessage', (data: MessageInterface) => {
            store.commit('newMessage', data)
        })
    }

    createMessage(paylod: CreateMessageRequestInterface) {
        this.socket.emit('createMessage', paylod);
    }

    getMessages() {
        this.socket.emit('getMessages');
    }

    getMessage(paylod: number) {
        this.socket.emit('getMessage', paylod);
    }

}