import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { PassResetRequest } from "../models/requests/pass-reset.request";
import { EnvironmentService } from "src/app/config/environment.service";

@Injectable({
    providedIn: "root",
  })
  export class PassResetService {
    api: string = '';

  constructor(private http: HttpClient, config: EnvironmentService) {
    this.api = `${config.getConfig().apis.Authentication}/usuarios`;
   }
  
  recuperarSenha(request: PassResetRequest) {   
    return this.http.post<any>(`${this.api}/reset-password`, request).pipe(take(1));
  }
}
  