import { BaseService } from "@/core/services/base.service";
import { http } from "@/core/services/http-common";
import { JobsServiceKey, scoreoffersServiceKey } from "@/core/utils/keys";
import { inject } from "vue";

export class JobsService  {
  constructor() {

    //super("/subscription");
  }

  findByUserId(userId) {
  return http.get(`/${userId}/scoreoffers`);
}
}

/**
 * @returns {JobsService}
 */
export const useScoreoffers = () => {
  return inject(scoreoffersServiceKey, null);
};
