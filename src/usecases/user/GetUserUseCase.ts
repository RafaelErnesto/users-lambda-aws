import { Service } from 'typedi';
import { User } from '../../entities/User';
import { UserRepositoryInterface } from '../ports/UserRepositoryInterface';
import { UseCase } from '../UseCase';

export type GetUserUseCaseInput = {
    id: number;
}

export type GetUserUseCaseOutput = Promise<{
    value: User,
    result: 'success'
} | {
    value: any,
    result: 'failed'
}>

@Service()
export class GetUserUseCase implements UseCase<GetUserUseCaseInput, GetUserUseCaseOutput> {
    constructor(private userRepository: UserRepositoryInterface){}

    async execute(input: GetUserUseCaseInput): Promise<GetUserUseCaseOutput> {
        try {
            const userFound = await this.userRepository.findById(input.id);
            if(userFound) {
                return {
                    value: userFound,
                    result: 'success'
                };
            }

            return {
                value: 'User not found',
                result: 'failed'
            };
        } catch (error) {
            return {
                value: JSON.stringify(error),
                result: 'failed'
            }; 
        }
    }
    
}