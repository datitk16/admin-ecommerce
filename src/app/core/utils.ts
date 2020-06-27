import { HttpRequest } from '@angular/common/http';


export class Utils {

  static addValuesToHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    let headers = request.headers.set("Token", `${token}`);
    return request.clone({ headers });
  }

  static currentTimezone(): number {
    return -(new Date()).getTimezoneOffset() / 60;
  }

}
