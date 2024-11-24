import {  HttpInterceptorFn } from '@angular/common/http';

const BASE_PATH = 'https://petstore.swagger.io/v2';

export const APIInterceptor: HttpInterceptorFn = (req, next) => {

  req = req.clone({ url: `${BASE_PATH}/${req.url}` });

  return next(req);
};
