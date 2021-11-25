import { Request, Response, Router } from 'express';
import { Service } from "typedi";
import { CreateUserUseCase } from "../usecases/user/CreateUserUseCase";
import { validateCreateUser } from './input/userControllerInputRequest';

import Controller from "./Controller";

@Service()
export class UserController implements Controller {
    constructor(private createUserUseCase: CreateUserUseCase){}

    get router() {
        const router = Router();
        router.post('/user', validateCreateUser, this.create);

        return router;
    }

    create = async (req: Request, res: Response) => {
        const output = await this.createUserUseCase.execute({
            name: req.body.name,
            role: req.body.role,
            age: req.body.age
        });

        if(output.result === 'success') {
            res.status(204).json(output.value)
        }else {
            res.status(500).json(output.value);
        }
    }
}