import { Inject, Injectable } from '@nestjs/common';
import { ConnectedUserRepositoryInterface } from 'src/database/interfaces/connected-user.repository.interface';
import { ConnectedUserEntity } from 'src/entities/connected-user.entity';
import { ConnectedUserInterface } from 'src/entities/interfaces/connected-user.interface';
import { UserInterface } from 'src/entities/interfaces/user.interface';
import { Services } from 'src/utilities/constants';
import { ConnectedUserServiceInterface } from '../interfaces/connected-user.service.interface';

@Injectable()
export class ConnectedUserService implements ConnectedUserServiceInterface {
    constructor(
        @Inject(Services.ConnectedUserRepositoryInterface)
        private readonly connectedUserRepository: ConnectedUserRepositoryInterface,
    ) { }

    async create(connectedUser: ConnectedUserInterface): Promise<ConnectedUserInterface> {
        return this.connectedUserRepository.save(connectedUser);
    }

    async getAll(): Promise<ConnectedUserInterface[]> {
        return this.connectedUserRepository.findWithRelations({ relations: { user: true }, });
    }

    async findByUser(user: UserInterface): Promise<ConnectedUserInterface[]> {
        return this.connectedUserRepository.findAll({ where: { user }, relations: { user: true } });
    }

    async deleteBySocketId(socketId: string): Promise<ConnectedUserEntity> {
        const socket = await this.connectedUserRepository.findByCondition({ where: { socketId } });
        return this.connectedUserRepository.remove(socket);
    }

    async deleteAll(): Promise<void> {
        await this.connectedUserRepository.deleteAll();
    }
}