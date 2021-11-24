import { User } from "../../../entities/User";
import { UserRepositoryInterface } from "../../../usecases/ports/UserRepositoryInterface";
import usersData from './users.json';

export class UserRepository implements UserRepositoryInterface {
    private users: any;

    constructor() {
        this.users = usersData
    }

    async create(data: User): Promise<User> {
        data = new User({
            id: this.users.length + 1,
            name: data.name,
            role: data.role,
            age: data.age
        });

        this.users.push(data);
        return new Promise((resolve) => resolve(data));
    }

    async findById(id: number): Promise<User> {
        const userFound =  this.users.filter(user => user.id === id);
        return userFound[0] ? new User(userFound[0]) : null;
    }

    udpate(data: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<void> {
        const userFound =  this.users.filter(user => user.id === id);
        if(userFound.length === 0) {
            throw new Error('User not found');
        }

        this.users = this.users.filter(user => user.id !== id);
        return;
    }

}