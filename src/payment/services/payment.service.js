import { BaseService } from "@/core/services/base.service";
import { http } from "@/core/services/http-common";
import { JobsServiceKey, PayServiceKey } from "@/core/utils/keys";
import { inject } from "vue";

export class PaymentService extends BaseService {
  constructor() {
    super("/subscription");
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
export const usePayment = () => {
  return inject(PayServiceKey, null);
};
