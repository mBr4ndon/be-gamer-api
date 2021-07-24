import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { HttpRequestError } from "../utils/HttpRequestError";
import { sign } from 'jsonwebtoken';

import { compare } from "bcryptjs";

interface IAuthRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        // Check if there is an user with that email
        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new HttpRequestError("Email/Password incorrect", 404);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new HttpRequestError("Email/Password incorrect", 404);
        }

        const token = sign({
            email: user.email
        }, "3fbc88200f62776f43a4e7f3abe1c0de", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserService };