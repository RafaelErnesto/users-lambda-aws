import { Service } from 'typedi';
import { UserRepositoryInterface } from '../ports/UserRepositoryInterface';
import { UseCase, UseCaseOutputError, UseCaseOutputSuccess, UseCaseOutputValidationError } from '../UseCase';

export type DeleteUserUseCaseInput = {
    id: number;
}

export type DeleteUserUseCaseOutput = Promise<UseCaseOutputSuccess<any> | UseCaseOutputError<any> | UseCaseOutputValidationError<any>>

@Service()
export class DeleteUserUseCase implements UseCase<DeleteUserUseCaseInput, DeleteUserUseCaseOutput> {
    constructor(private userRepository: UserRepositoryInterface){}

    async execute(input: DeleteUserUseCaseInput): Promise<DeleteUserUseCaseOutput> {
        try {
            const user = await this.userRepository.findById(input.id);

            if(!user) {
                return new UseCaseOutputValidationError('User not found');
            }

            await this.userRepository.delete(input.id);
            return new UseCaseOutputSuccess('User deleted');
        } catch (error) {
            console.log('ERROR: DeleteUserUseCase')
            console.log(error)
            return new UseCaseOutputError('Error removing user');
        }
    }
    
}