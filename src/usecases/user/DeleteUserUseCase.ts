import { Service } from 'typedi';
import { User } from '../../entities/User';
import { UserRepositoryInterface } from '../ports/UserRepositoryInterface';
import { UseCase } from '../UseCase';

export type DeleteUserUseCaseInput = {
    id: number;
}

export type DeleteUserUseCaseOutput = Promise< {
    value: any,
    result: 'success'
} | {
    value: any,
    result: 'failed'
}>

@Service()
export class DeleteUserUseCase implements UseCase<DeleteUserUseCaseInput, DeleteUserUseCaseOutput> {
    constructor(private userRepository: UserRepositoryInterface){}

    async execute(input: DeleteUserUseCaseInput): Promise<DeleteUserUseCaseOutput> {
        try {
            const user = await this.userRepository.findById(input.id);
            if(!user) {
                return {
                    value: 'User not found',
                    result: 'failed'
                };
            }

            await this.userRepository.delete(input.id);
            return {
                value: 'User deleted',
                result: 'success'
            };
        } catch (error) {
            return {
                value: JSON.stringify(error),
                result: 'failed'
            }; 
        }
    }
    
}