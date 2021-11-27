import { Service } from 'typedi';
import { User } from '../../entities/User';
import { UserRepositoryInterface } from '../ports/UserRepositoryInterface';
import { UseCase, UseCaseOutputError, UseCaseOutputSuccess } from '../UseCase';

export type CreateUserUseCaseInput = {
    name: string;
    role: string;
    age: number;
}

export type CreateUserUseCaseOutput = Promise<UseCaseOutputSuccess<User> | UseCaseOutputError<any>>

@Service()
export class CreateUserUseCase implements UseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput> {
    constructor(private userRepository: UserRepositoryInterface){}

    async execute(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {
        try {
            const user = new User(input);
            const createdUser = await this.userRepository.create(user);
            return new UseCaseOutputSuccess(createdUser);
        } catch (error) {
            console.log('ERROR: CreateUserUseCase')
            console.log(error)
            return new UseCaseOutputError('Error creating user');
        }
    }
    
}