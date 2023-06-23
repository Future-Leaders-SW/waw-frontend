import { BaseService } from "@/core/services/base.service";
import { http } from "@/core/services/http-common";
import { PostulationsServiceKey } from "@/core/utils/keys";
import { inject } from "vue";

export class PostulationsService extends BaseService {
  constructor() {
    super("/postulations");
  }

  /**
   * @param {string} title
   */
  findByTitle(title) {
    return http.get(`${this.endpoint}?title=${title}`);
  }
}

/**
 * @returns {PostulationsService}
 */
export const usePostulations = () => {
  return inject(PostulationsServiceKey, null);
};

