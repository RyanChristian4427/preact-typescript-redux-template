import { ApiService, AuthStorageService } from 'ts-api-toolkit';

export const authStorageService = new AuthStorageService();
export const apiService = new ApiService(authStorageService);

export type ApiResponse<T> = Promise<T>;
