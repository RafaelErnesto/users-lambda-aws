import { User } from "../../entities/User";

export const createUserOutputRequestMapper = (data: User) => {
    return {
        name: data.name,
        age: data.age,
        role: data.role,
        id: data.id
    }
}

export const updateUserOutputRequestMapper = (data: User) => {
    return {
        name: data.name,
        age: data.age,
        role: data.role,
        id: data.id
    }
}

export const getUserOutputRequestMapper = (data: User) => {
    return {
        name: data.name,
        age: data.age,
        role: data.role,
        id: data.id
    }
}