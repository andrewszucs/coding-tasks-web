import createApiService from "./apiService";

export const apiService = createApiService(window.fetch);

export type Services = {
  apiService: typeof apiService;
};
