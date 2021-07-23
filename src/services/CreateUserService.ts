import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository"

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
            throw new Error("User's email or name are not filled");
        }

        // check if there is already an user with email
        const userAlreadyExists = await usersRepository.findOne({ email });
        if (userAlreadyExists) {
            throw new Error("User already exists");
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