import { User } from "../../entities/User";

export interface UserRepositoryInterface {
    create(data: User): Promise<User>
    findById(id: number): Promise<User>
    update(data: User) : Promise<User>
    delete(id: number) : Promise<void>
}