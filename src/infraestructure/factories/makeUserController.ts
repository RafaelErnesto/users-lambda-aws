import { UserController } from "../../controllers/UserController"
import { CreateUserUseCase } from "../../usecases/user/CreateUserUseCase";
import { DeleteUserUseCase } from "../../usecases/user/DeleteUserUseCase";
import { GetUserUseCase } from "../../usecases/user/GetUserUseCase";
import { UpdateUserUseCase } from "../../usecases/user/UpdateUserUseCase";
import { UserRepository } from "../database/in-memory/UserRepository"

export const makeUserController = (): UserController => {
    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const getUserUseCase = new GetUserUseCase(userRepository);
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
   return new UserController(createUserUseCase, getUserUseCase, updateUserUseCase, deleteUserUseCase);
}