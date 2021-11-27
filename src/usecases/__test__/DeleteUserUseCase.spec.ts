import { DeleteUserUseCase } from '../user/DeleteUserUseCase';
import { UserRepository } from '../../infraestructure/database/in-memory/UserRepository';

describe('DeleteUseCase tests', () => {
    const getSut = () => {
        return new DeleteUserUseCase(new UserRepository());
    }

    it('Ensure DeleteUserUseCase returns success when deletes and existing user', async () => {
        const sut = getSut();
        const result = await sut.execute({ id: 4 });

        expect(result.value).toBe('User deleted');
        expect(result.result).toBe('success');
    })

    it('Ensure DeleteUserUseCase returns error when user was not found', async () => {
        const sut = getSut();
        const result = await sut.execute({ id: 0 });

        expect(result.result).toBe('validation_error');
    })
})