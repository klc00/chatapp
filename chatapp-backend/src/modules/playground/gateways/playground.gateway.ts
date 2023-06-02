import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HttpException, HttpStatus, Inject, UnauthorizedException } from '@nestjs/common';
import { Routes, Services } from 'src/utilities/constants';
import { AuthServiceInterface } from '../../auth/interfaces/auth.service.interface';
import { MessageServiceInterface } from '../interfaces/message.service.interface';
import { ConnectedUserServiceInterface } from '../interfaces/connected-user.service.interface';
import { UserServiceInterface } from 'src/modules/user/interfaces/user.service.interface';
import { UserInterface } from 'src/entities/interfaces/user.interface';
import { CreateMessageRequest } from 'src/entities/request/create-message.request';
import { MessageInterface } from 'src/entities/interfaces/message.interface';

@WebSocketGateway({ namespace: Routes.PLAYGROUND, cors: true })
export class PlaygroundGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(Services.AuthServiceInterface)
    private readonly authService: AuthServiceInterface,
    @Inject(Services.UserServiceInterface)
    private readonly userService: UserServiceInterface,
    @Inject(Services.MessageServiceInterface)
    private readonly messageService: MessageServiceInterface,
    @Inject(Services.ConnectedUserServiceInterface)
    private readonly connectedUserService: ConnectedUserServiceInterface,
  ) { }

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket): Promise<void> {
    try {
      const decodedToken = await this.authService.verifyJwt(client.handshake.headers.authorization);
      const user: UserInterface = await this.userService.findById(decodedToken.payload.sub);
      delete user.password;
      delete user.privateKey;

      if (!user) {
        return this.disconnect(client);
      }
      client.data.user = user;
      const temp = await this.connectedUserService.findByUser(user);
      if (temp.length != 0) {
        temp.forEach(t => {
          this.connectedUserService.deleteBySocketId(t.socketId);
        });
      }
      await this.connectedUserService.create({ socketId: client.id, user });
      this.sendConnectedUserAll();
    } catch (error) {
      client.disconnect();
    }
  }


  async handleDisconnect(client: Socket): Promise<void> {
    await this.connectedUserService.deleteBySocketId(client.id);
    client.disconnect();
    this.sendConnectedUserAll();
  }

  private async sendConnectedUserAll() {
    const connecteds = await this.connectedUserService.getAll();
    connecteds.forEach(f => {
      delete f.user.password;
      delete f.user.privateKey;
    });
    this.server.emit("onlineUserAll", connecteds);
  }

  private async disconnect(client: Socket): Promise<void> {
    await this.connectedUserService.deleteBySocketId(client.id);
    client.emit('Error', new UnauthorizedException());
    client.disconnect();
    this.sendConnectedUserAll();
  }

  private getCurrentUser(client: Socket): UserInterface {
    return client.data.user as UserInterface;
  }

  @SubscribeMessage('createMessage')
  async createMessage(
    @MessageBody() createMessageDto: CreateMessageRequest,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {

    const user = this.getCurrentUser(client);
    const currentUser = await this.userService.findById(user.id);
    const recipientUser = await this.userService.findById(createMessageDto.recipientId);

    if (!recipientUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const message = await this.messageService.createMessage(currentUser, recipientUser, createMessageDto.text);

    const connectedUser = await this.connectedUserService.findByUser(user);

    connectedUser.forEach(c => {
      this.server.to(c.socketId).emit("newMessage", message);
    });

    const connectedRecipient = await this.connectedUserService.findByUser(recipientUser);

    connectedRecipient.forEach(c => {
      this.server.to(c.socketId).emit("newMessage", message);
    });
  }

  @SubscribeMessage('getMessage')
  async getMessage(
    @MessageBody() recipientId: number,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const user = this.getCurrentUser(client);
    const messageList = await this.messageService.getMessage(user.id, recipientId);
    client.emit("messageList", messageList);
  }

  @SubscribeMessage('getMessages')
  async getMessages(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const user = this.getCurrentUser(client);

    const result = await this.messageService.getMessages(user.id);
    client.emit("messageList", result);
  }
}
