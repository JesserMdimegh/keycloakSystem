import { User } from "src/domain/entities/User.entity";
import { UserRepository } from "src/domain/repositories/User.repository";

export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string, name: string, email: string): Promise<User> {
        const existingUser = await this.userRepository.findUserById(id);
        if (!existingUser) {
            throw new Error(`User with id '${id}' not found`);
        }

        const updateData = { name, email };
        return await this.userRepository.updateUser(id, updateData);
    }
}
