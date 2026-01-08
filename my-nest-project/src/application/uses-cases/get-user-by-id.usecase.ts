import { User } from "src/domain/entities/User.entity";
import { UserRepository } from "src/domain/repositories/User.repository";

export class GetUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string): Promise<User | null> {
        return await this.userRepository.findUserById(id);
    }
}
