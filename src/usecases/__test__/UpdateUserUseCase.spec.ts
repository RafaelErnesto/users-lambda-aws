import { UpdateUserUseCase } from '../user/UpdateUserUseCase';
import { UserRepository } from '../../infraestructure/database/in-memory/UserRepository';
import { User } from '../../entities/User';

describe('UpdateUseCase tests', () => {
    const getSut = () => {
        return new UpdateUserUseCase(new UserRepository());
    }

    it('Ensure UpdateUserUseCase returns updated entity when update is succesful', async () => {
        const sut = getSut();
        const result = await sut.execute({
            id: 1,
            name: 'John updated',
            role: 'manager',
            age: 34
        });

        expect(result.value).toBeInstanceOf(User);
        expect(result.value).toMatchObject({
            id: 1,
            name: 'John updated',
            role: 'manager',
            age: 34
        });
    })

    it('Ensure UpdateUserUseCase returns error when user was not found', async () => {
        const sut = getSut();
        const result = await sut.execute({
            id: 0,
            name: 'John updated',
            role: 'manager',
            age: 34
        });

        expect(result.result).toBe('validation_error');
    })
})