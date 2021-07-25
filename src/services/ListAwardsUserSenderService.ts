import { getCustomRepository } from "typeorm";
import { AwardsRepository } from "../repositories/AwardsRepository";


class ListAwardsUserSenderService {
    
    async execute(user_id: string) {
        const awardsRepository = getCustomRepository(AwardsRepository);
        const awards = await awardsRepository.find({
            where: { user_sender: user_id},
            relations: ["userSender", "userReceiver", "tag"]
        });

        return awards;
    }
    
}

export { ListAwardsUserSenderService };