import { UserController } from "../../controllers/UserController"
import { CreateUserUseCase } from "../../usecases/user/CreateUserUseCase";
import { UserRepository } from "../database/in-memory/UserRepository"

export const makeUserController = (): UserController => {
    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
   return new UserController(createUserUseCase);
}