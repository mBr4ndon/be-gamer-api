import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository"
import { HttpRequestError } from "../utils/HttpRequestError";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {

    async execute({name, email, admin} : IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        // check if fields are empty
        if (!name || !email) {
            throw new HttpRequestError("User's email or name are not filled", 400);
        }

        // check if there is already an user with email
        const userAlreadyExists = await usersRepository.findOne({ email });
        if (userAlreadyExists) {
            throw new HttpRequestError("User already exists", 400);
        }

        // create instance
        const user = usersRepository.create({
            name,
            email,
            admin
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }