import createApiService from "./apiService";
import createLocalStorageService from "./localStorageService";

export const apiService = createApiService(window.fetch);
export const localStorageService = createLocalStorageService(
  window.localStorage
);

export type Services = {
  apiService: typeof apiService;
  localStorageService: typeof localStorageService;
};
