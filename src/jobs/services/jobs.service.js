import { BaseService } from "@/core/services/base.service";
import { http } from "@/core/services/http-common";
import { JobsServiceKey } from "@/core/utils/keys";
import { inject } from "vue";

export class JobsService extends BaseService {
  constructor() {
    super("/jobs");
    //super("/subscription");
  }

  /**
   * @param {string} title
   */
  findByTitle(title) {
    return http.get(`${this.endpoint}?title=${title}`);
  }

  findByJobs(title){
    return http.get(`${this.endpoint}?title=${title}`)
  }

  findByUserId(userId) {
    return http.get(`/${userId}/scoreoffers`);
  }
}

/**
 * @returns {JobsService}
 */
export const useJobs = () => {
  return inject(JobsServiceKey, null);
};
