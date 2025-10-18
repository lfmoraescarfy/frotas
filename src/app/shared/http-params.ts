import { HttpParams } from "@angular/common/http";

export function createHttpParams(object: any): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    Object.keys(object).forEach(key => {
        if(!(object[key] == null)) {
            httpParams = httpParams.set(key, object[key]);
        }
    });

    return httpParams;
}