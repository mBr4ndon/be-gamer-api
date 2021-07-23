import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";
import { HttpRequestError } from "../utils/HttpRequestError";


class CreateTagService {

    async execute(name: string) {
        const tagsRepository = getCustomRepository(TagsRepository);

        if(!name) {
            throw new HttpRequestError("Tag must have a name", 400);
        }

        const tagAlreadyExists = await tagsRepository.findOne({ name });
        if (tagAlreadyExists) {
            throw new HttpRequestError("Tag already exists", 400);
        }

        const tag = tagsRepository.create({ name });
        await tagsRepository.save(tag);

        return tag;
    }

}

export { CreateTagService };