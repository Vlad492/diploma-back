import { ResponseInterface } from '../interfaces/response.interface';

export const ResponseData = <T>(response: T): ResponseInterface<T> => {
  return { data: response };
};
