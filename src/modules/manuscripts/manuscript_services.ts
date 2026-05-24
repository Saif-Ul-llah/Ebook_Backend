import { ManuscriptInput } from "../../imports";
import ManuscriptRepo from "./manuscript_repo";

class ManuscriptServices {
  public static createService = async (payload: ManuscriptInput) => {
    return ManuscriptRepo.create(payload);
  };

  public static myManuscriptsService = async (customerId: string) => {
    return ManuscriptRepo.findByCustomer(customerId);
  };
}

export default ManuscriptServices;
