import { DeleteUserUseCase } from '../user/DeleteUserUseCase';
import { UserRepository } from '../../infraestructure/database/in-memory/UserRepository';
import { User } from '../../entities/User';

describe('DeleteUseCase tests', () => {
    const getSut = () => {
        return new DeleteUserUseCase(new UserRepository());
    }

    it('Ensure DeleteUserUseCase returns success when deletes and existing user', async () => {
        const sut = getSut();
        const result = await sut.execute({ id: 1 });

        expect(result.value).toBe('User deleted');
        expect(result.result).toBe('success');
    })
})