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
        const result = await sut.execute({
            name: 'John',
            role: 'manager',
            age: 34
        });

        expect(result.value).toBeInstanceOf(User);
        expect(result.value.id).not.toBeUndefined();
    })

    it('Ensure CreateUserUseCase throws when user name is wrong', async () => {
        const sut = getSut();
        const result = await sut.execute({
            name: 'John23',
            role: 'manager',
            age: 34
        });

        expect(result.result).toBe('failed');
    })

    it('Ensure CreateUserUseCase throws when user role is wrong', async () => {
        const sut = getSut();
        const result = await sut.execute({
            name: 'John',
            role: 'test',
            age: 34
        });

        expect(result.result).toBe('failed');
    })

    it('Ensure CreateUserUseCase throws when user age is wrong', async () => {
        const sut = getSut();
        const result = await sut.execute({
            name: 'John',
            role: 'manager',
            age: -34
        });

        expect(result.result).toBe('failed');
    })
})