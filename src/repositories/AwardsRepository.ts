import { EntityRepository, Repository } from "typeorm";
import { Award } from '../entities/Award';

@EntityRepository(Award)
class AwardsRepository extends Repository<Award>{}

export { AwardsRepository };