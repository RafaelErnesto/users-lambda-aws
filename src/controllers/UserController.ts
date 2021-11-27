import { Request, Response, Router } from 'express';
import { Service } from "typedi";
import { CreateUserUseCase } from "../usecases/user/CreateUserUseCase";
import { validateCreateUser, validateDeleteUser, validateGetUser, validateUpdateUser } from './input/userControllerInputRequest';

import Controller from "./Controller";
import { GetUserUseCase } from '../usecases/user/GetUserUseCase';
import { DeleteUserUseCase } from '../usecases/user/DeleteUserUseCase';
import { UpdateUserUseCase } from '../usecases/user/UpdateUserUseCase';

@Service()
export class UserController implements Controller {
    constructor(
        private createUserUseCase: CreateUserUseCase, 
        private getUserUseCase: GetUserUseCase, 
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
        ){}

    get router() {
        const router = Router();
        router.post('/user', validateCreateUser, this.create);
        router.get('/user/:id', validateGetUser, this.get);
        router.put('/user/:id', validateUpdateUser, this.update);
        router.delete('/user/:id', validateDeleteUser, this.delete);

        return router;
    }

    create = async (req: Request, res: Response) => {
        try {
            const output = await this.createUserUseCase.execute({
                name: req.body.name,
                role: req.body.role,
                age: req.body.age
            });
    
            if(output.result === 'success') {
                return res.status(201).json(output.value)
            }

            return res.status(500).json(output.value);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    update = async (req: Request, res: Response) => {

        try {
            const output = await this.updateUserUseCase.execute({
                id: Number(req.params.id),
                name: req.body.name,
                role: req.body.role,
                age: req.body.age
            });
    
            if(output.result === 'success') {
                return res.status(200).json({
                    name: output.value.name,
                    age: output.value.age,
                    role: output.value.role,
                    id: output.value.id
                })
            }
    
            if (output.result === 'validation_error') {
                return res.status(400).json(output.value);
            } 
    
            return res.status(500).json(output.value);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    get = async (req: Request, res: Response) => {
        try {
            const output = await this.getUserUseCase.execute({id: Number(req.params.id)});

            if(output.result === 'success') {
                return res.status(200).json({
                    name: output.value.name,
                    age: output.value.age,
                    role: output.value.role,
                    id: output.value.id
                })
            }
            
            if (output.result === 'validation_error') {
                return res.status(400).json(output.value);
            } 

            return res.status(500).json(output.value);
        } catch(error) {
            res.status(500).json(error);
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const output = await this.deleteUserUseCase.execute({id: Number(req.params.id)});

            if(output.result === 'success') {
                return res.status(204).json({})
            }

            if(output.result === 'validation_error') {
                return res.status(400).json(output.value);
            }

            return res.status(500).json(output.value);
        } catch(error) {
            return res.status(500).json(error);
        }
    }
}