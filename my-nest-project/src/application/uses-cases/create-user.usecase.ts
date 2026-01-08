import { UserRepository } from "src/domain/repositories/User.repository";
import { User } from "src/domain/entities/User.entity";

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(user: Omit<User, 'id'>): Promise<User> {
        return this.userRepository.createUser(user);
    }
}