import { getCustomRepository } from "typeorm";
import { AwardsRepository } from "../repositories/AwardsRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { HttpRequestError } from "../utils/HttpRequestError";

interface IAwardRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateAwardService {

    async execute({ tag_id, user_sender, user_receiver, message }: IAwardRequest) {
        const awardsRepository = getCustomRepository(AwardsRepository);
        const usersRepository = getCustomRepository(UsersRepository);

        // Verify if it is the same user
        if (user_sender === user_receiver) {
            throw new HttpRequestError("Cannot award himself", 400);
        }
        
        const userReceiverExists = await usersRepository.findOne(user_receiver);
        // Check if user receiver exists
        if (!userReceiverExists) {
            throw new HttpRequestError("User Receiver does not exist", 400);
        }

        const award = awardsRepository.create({ 
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        await awardsRepository.save(award);

        return award;
    }

}

export { CreateAwardService };