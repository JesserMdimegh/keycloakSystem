import { UserRepository } from "src/domain/repositories/User.repository";

export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string): Promise<void> {
        const existingUser = await this.userRepository.findUserById(id);
        if (!existingUser) {
            throw new Error(`User with id '${id}' not found`);
        }

        await this.userRepository.deleteUser(id);
    }
}
