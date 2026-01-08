import { Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/User.entity";
import { PrismaService } from "../database/prisma.service";
import { UserRepository } from "src/domain/repositories/User.repository";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        const createdUser = await this.prisma.user.create({ 
            data: {
                name: user.name,
                email: user.email
            }
        });
        return new User(createdUser.id, createdUser.name, createdUser.email);
    }

    async findUserById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        if (!user) return null;

        return new User(user.id, user.name, user.email);
    }

    async findAllUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map(user => new User(user.id, user.name, user.email));
    }

    async updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email
            }
        });

        return new User(updatedUser.id, updatedUser.name, updatedUser.email);
    }

    async deleteUser(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        });
    }
}