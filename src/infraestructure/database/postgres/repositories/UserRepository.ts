import { User } from "../../../../entities/User";
import  { Users } from "../entity/Users";
import { UserRepositoryInterface } from "../../../../usecases/ports/UserRepositoryInterface";
import { getDatabaseConnection } from "../../../../main/db/getDatabaseConnection";
export class UserRepository implements UserRepositoryInterface {

    async create(data: User): Promise<User> {
        let connection;
        try {
            connection = await getDatabaseConnection();
            const repository = connection.getRepository(Users);
            return await repository.save(data);
        }
        finally {
            if(connection) {
                await connection.close()
            }
        }
    }

    async findById(id: number): Promise<User> {
        let connection;
        try {
            connection = await getDatabaseConnection();
            const repository = connection.getRepository(Users);
            const user = await repository.findByIds([id]);
            if(user[0]) {
                return new User(user[0]);
            }
            return;
        } finally {
            if(connection) {
                await connection.close()
            }
        } 
    }

    async update(data: User): Promise<User> {
        let connection;
        try {
            connection = await getDatabaseConnection();
            const repository = connection.getRepository(Users);
            const resultQuery =  await repository.findByIds([data.id]);
            if(!resultQuery[0]) {
                throw new Error('User not found');
            }
            const userToUpdate = resultQuery[0];

            userToUpdate.name = data.name;
            userToUpdate.age = data.age;
            userToUpdate.role = data.role;
            return await repository.save(userToUpdate);
        }finally {
            if(connection) {
                await connection.close()
            }
        }
    }

    async delete(id: number): Promise<void> {
        let connection;
        try {
            connection = await getDatabaseConnection();
            const repository = connection.getRepository(Users);
            const userFound =  await repository.findByIds([id]);
            if(!userFound[0]) {
                throw new Error('User not found');
            }
            await repository.remove(userFound[0])
        } finally {
            if(connection) {
                await connection.close()
            }
        }
    }

}