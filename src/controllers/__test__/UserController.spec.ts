import request from 'supertest';
import { UserRepository } from '../../infraestructure/database/in-memory/UserRepository';
import { CreateUserUseCase } from '../../usecases/user/CreateUserUseCase';
import { UserController } from '../UserController';
import app from '../../infraestructure/app';

describe('UseController test', () => {
    const getSut = () => {
        const userRepository = new UserRepository(); 
        const createUserUseCase = new CreateUserUseCase(userRepository);
        return new UserController(createUserUseCase);
    }

    it('Ensure create user api returns 200 and user when success', async () => {
        await request(app)
                .post('/api/user')
                .send({
                    name: 'John',
                    age: 23,
                    role: 'manager'
                })
                .expect(204)
    })
})