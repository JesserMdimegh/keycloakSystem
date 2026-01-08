import { User } from "src/domain/entities/User.entity";
import { UserRepository } from "src/domain/repositories/User.repository";

export class ListUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    
    async execute(): Promise<User[]> {
        return this.userRepository.findAllUsers();
    }
}   