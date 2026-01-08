import { User } from "../entities/User.entity";

export interface UserRepository {
    createUser(user: Omit<User, 'id'>): Promise<User>;
    findUserById(id: string): Promise<User | null>;
    findAllUsers(): Promise<User[]>;
    updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User>;
    deleteUser(id: string): Promise<void>;
    
}