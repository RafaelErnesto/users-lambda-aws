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

    async update(data: User): Promise<User> {
        let userFound =  this.users.filter((user) => user.id === data.id)[0];
        if(!userFound) {
            throw new Error('User not found');
        }
        //remove obsolete user
        this.users = this.users.filter(user => user.id !== data.id);
        userFound.name = data?.name;
        userFound.role = data?.role;
        userFound.age = data?.age;
        //add updated user to users again
        this.users.push(new User(userFound));
        return new User(userFound);
    }

    async delete(id: number): Promise<void> {
        const userFound =  this.users.filter(user => user.id === id);
        if(userFound.length === 0) {
            throw new Error('User not found');
        }

        this.users = this.users.filter(user => user.id !== id);
        return;
    }

}