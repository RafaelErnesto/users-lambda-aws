import { Service } from 'typedi';
import { User } from '../../entities/User';
import { UserRepositoryInterface } from '../ports/UserRepositoryInterface';
import { UseCase, UseCaseOutputError, UseCaseOutputSuccess, UseCaseOutputValidationError } from '../UseCase';

export type GetUserUseCaseInput = {
    id: number;
}

export type GetUserUseCaseOutput = Promise<UseCaseOutputSuccess<User> | UseCaseOutputError<any> | UseCaseOutputValidationError<any>>

@Service()
export class GetUserUseCase implements UseCase<GetUserUseCaseInput, GetUserUseCaseOutput> {
    constructor(private userRepository: UserRepositoryInterface){}

    async execute(input: GetUserUseCaseInput): Promise<GetUserUseCaseOutput> {
        try {
            const userFound = await this.userRepository.findById(input.id);
            if(userFound) {
                return new UseCaseOutputSuccess(userFound);
            }
            return new UseCaseOutputValidationError('User not found');
        } catch (error) {
            console.log('ERROR: GetUserUseCase')
            console.log(error)
            return new UseCaseOutputError('Error to get user');
        }
    }
    
}