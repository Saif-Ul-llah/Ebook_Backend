import { ManuscriptInput } from "../../imports";
import ManuscriptRepo from "./manuscript_repo";

class ManuscriptServices {
  public static createService = async (payload: ManuscriptInput) => {
    return ManuscriptRepo.create(payload);
  };

  public static myManuscriptsService = async (customerId: string, email?: string) => {
    return ManuscriptRepo.findByCustomer(customerId, email);
  };

  public static claimMyManuscriptsService = async (customerId: string, email: string) => {
    return ManuscriptRepo.claimByEmail(customerId, email);
  };
}

export default ManuscriptServices;
