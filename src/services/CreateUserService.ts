import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository"
import { HttpRequestError } from "../utils/HttpRequestError";
import { hash, genSalt } from 'bcryptjs';

interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService {

    async execute({name, email, password, admin = false} : IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        // check if fields are empty
        if (!name || !email || !password) {
            throw new HttpRequestError("User's fields missing", 400);
        }

        // check if there is already an user with email
        const userAlreadyExists = await usersRepository.findOne({ email });
        if (userAlreadyExists) {
            throw new HttpRequestError("User already exists", 400);
        }

        const passwordHash = await hash(password, 8);

        // create instance
        const user = usersRepository.create({
            name,
            email,
            password: passwordHash,
            admin
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }