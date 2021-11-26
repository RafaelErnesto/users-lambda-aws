import { Service } from 'typedi';
import { User } from '../../entities/User';
import { UserRepositoryInterface } from '../ports/UserRepositoryInterface';
import { UseCase } from '../UseCase';

export type CreateUserUseCaseInput = {
    name: string;
    role: string;
    age: number;
}

export type CreateUserUseCaseOutput = Promise<{
    value: User,
    result: 'success'
} | {
    value: any,
    result: 'failed'
}>

@Service()
export class CreateUserUseCase implements UseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput> {
    constructor(private userRepository: UserRepositoryInterface){}

    async execute(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {
        try {
            const user = new User(input);
            const createdUser = await this.userRepository.create(user);
            return {
                value: createdUser,
                result: 'success'
            };
        } catch (error) {
            return {
                value: error,
                result: 'failed'
            }; 
        }
    }
    
}