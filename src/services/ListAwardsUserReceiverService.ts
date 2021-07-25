import { getCustomRepository } from "typeorm";
import { AwardsRepository } from "../repositories/AwardsRepository";


class ListAwardsUserReceiverService {
    
    async execute(user_id: string) {
        const awardsRepository = getCustomRepository(AwardsRepository);
        const awards = await awardsRepository.find({
            where: { user_receiver: user_id},
            relations: ["userSender", "userReceiver", "tag"]
        });

        return awards;
    }
    
}

export { ListAwardsUserReceiverService };