import { Request, Response, Router } from 'express';
import { Service } from "typedi";
import { CreateUserUseCase } from "../usecases/user/CreateUserUseCase";
import { validateCreateUser, validateGetUser } from './input/userControllerInputRequest';

import Controller from "./Controller";
import { GetUserUseCase } from '../usecases/user/GetUserUseCase';

@Service()
export class UserController implements Controller {
    constructor(private createUserUseCase: CreateUserUseCase, private getUserUseCase: GetUserUseCase){}

    get router() {
        const router = Router();
        router.post('/user', validateCreateUser, this.create);
        router.get('/user/:id', validateGetUser, this.get);

        return router;
    }

    create = async (req: Request, res: Response) => {
        const output = await this.createUserUseCase.execute({
            name: req.body.name,
            role: req.body.role,
            age: req.body.age
        });

        if(output.result === 'success') {
            res.status(201).json(output.value)
        }else {
            res.status(500).json(output.value);
        }
    }

    get = async (req: Request, res: Response) => {
        const output = await this.getUserUseCase.execute({id: Number(req.params.id)});

        if(output.result === 'success') {
            res.status(200).json({
                name: output.value.name,
                age: output.value.age,
                role: output.value.role,
                id: output.value.id
            })
        }else if (output.value === 'User not found') {
            res.status(404).json(output.value);
        } else {
            res.status(500).json(output.value);
        }
    }
}