import { Service } from 'typedi';
import { User } from '../../entities/User';
import { UserRepositoryInterface } from '../ports/UserRepositoryInterface';
import { UseCase } from '../UseCase';

export type UpdateUserUseCaseInput = {
    id: number;
    name: string;
    role: string;
    age: number;
}

export type UpdateUserUseCaseOutput = Promise<{
    value: User,
    result: 'success'
} | {
    value: any,
    result: 'failed'
}>

@Service()
export class UpdateUserUseCase implements UseCase<UpdateUserUseCaseInput, UpdateUserUseCaseOutput> {
    constructor(private userRepository: UserRepositoryInterface){}

    async execute(input: UpdateUserUseCaseInput): Promise<UpdateUserUseCaseOutput> {
        try {
            const userFound = await this.userRepository.findById(input.id);
            if(!userFound) {
                return {
                    value: 'User not found',
                    result: 'failed'
                };
            }
            const user = new User(input);
            const updatedUser = await this.userRepository.update(user);
            return {
                value: updatedUser,
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