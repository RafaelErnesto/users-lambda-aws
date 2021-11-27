import { Service } from 'typedi';
import { User } from '../../entities/User';
import { UserRepositoryInterface } from '../ports/UserRepositoryInterface';
import { UseCase, UseCaseOutputError, UseCaseOutputSuccess, UseCaseOutputValidationError } from '../UseCase';

export type UpdateUserUseCaseInput = {
    id: number;
    name: string;
    role: string;
    age: number;
}

export type UpdateUserUseCaseOutput = Promise<UseCaseOutputSuccess<User> | UseCaseOutputValidationError<any> | UseCaseOutputError<any>>

@Service()
export class UpdateUserUseCase implements UseCase<UpdateUserUseCaseInput, UpdateUserUseCaseOutput> {
    constructor(private userRepository: UserRepositoryInterface){}

    async execute(input: UpdateUserUseCaseInput): Promise<UpdateUserUseCaseOutput> {
        try {
            const userFound = await this.userRepository.findById(input.id);
            if(!userFound) {
                return new UseCaseOutputValidationError('User not found');
            }
            const user = new User(input);
            const updatedUser = await this.userRepository.update(user);
            return new UseCaseOutputSuccess(updatedUser);
        } catch (error) {
            console.log('ERROR: UpdateUserUseCase')
            console.log(error)
            return new UseCaseOutputError('Error updating user');
        }
    }
    
}