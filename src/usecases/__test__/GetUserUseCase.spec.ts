import { GetUserUseCase } from '../user/GetUserUseCase';
import { UserRepository } from '../../infraestructure/database/in-memory/UserRepository';
import { User } from '../../entities/User';

describe('GetUseCase tests', () => {
    const getSut = () => {
        return new GetUserUseCase(new UserRepository());
    }
    
    it('Ensure GetUserUseCase returns user by id', async () => {
        const sut = getSut();
        const result = await sut.execute({id: 1});
        expect(result.value).toBeInstanceOf(User);
        expect(result.value?.id).toBe(1);
    })

    it('Ensure GetUserUseCase returns error when user was not found', async () => {
        const sut = getSut();
        const result = await sut.execute({id: 0});
        expect(result.value).toBe('User not found');
    })

})