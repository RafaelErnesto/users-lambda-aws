import { User } from "../../../entities/User";
import { UserRepositoryInterface } from "../../../usecases/ports/UserRepositoryInterface";
import usersData from './users.json';

export class UserRepository implements UserRepositoryInterface {
    private users: any;

    constructor() {
        this.users = usersData
    }

    create(data: User): Promise<User> {
        data = new User({
            id: this.users.length + 1,
            name: data.name,
            role: data.role,
            age: data.age
        });

        this.users.push(data);
        return new Promise((resolve) => resolve(data));
    }

    findById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }

    udpate(data: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}