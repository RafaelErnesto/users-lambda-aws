import { Service } from 'typedi';
import { User } from '../../entities/User';
import { UseCase } from '../UseCase';

export type CreateUserUseCaseInput = {
    name: string;
    role: string;
    age: number;
}

export type CreateUserUseCaseOutput = Promise<User>

@Service()
export class CreateUserUseCase implements UseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput> {
    execute(input: CreateUserUseCaseInput): Promise<CreateUserUseCaseOutput> {
        throw new Error('Method not implemented.');
    }
    
}