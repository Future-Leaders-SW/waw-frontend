import { BaseService } from "@/core/services/base.service";
import { http } from "@/core/services/http-common";
import { BillingServiceKey} from "@/core/utils/keys";
import { inject } from "vue";

export class BillingService extends BaseService {
  constructor() {
    super("/billing")

  }

  /**
   * @param {string} title
   */
  findByTitle(title) {
    return http.get(`${this.endpoint}?title=${title}`);
  }
}

/**
 * @returns {JobsService}
 */
export const useBilling = () => {
  return inject(BillingServiceKey, null);
};
