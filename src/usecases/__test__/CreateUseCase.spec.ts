import { CreateUserUseCase } from '../user/CreateUserUseCase';
import { UserRepository } from '../../infraestructure/database/in-memory/UserRepository';
import { User } from '../../entities/User';
import { exec } from 'child_process';

describe('CreateUseCase tests', () => {
    const getSut = () => {
        return new CreateUserUseCase(new UserRepository());
    }

    it('Ensure CreateUserUseCase returns User entity when success', async () => {
        const sut = getSut();
        const result = await sut.execute(new User({
            name: 'John',
            role: 'manager',
            age: 34
        }));

        expect(result.value).toBeInstanceOf(User);
        expect(result.value.id).not.toBeUndefined();
    })
})