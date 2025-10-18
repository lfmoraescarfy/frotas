import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { PassCreateRequest } from "../models/requests/pass-create.request";
import { ValidateTokenResponse } from "../models/responses/validate-token.response";
import { EnvironmentService } from "src/app/config/environment.service";

@Injectable({
    providedIn: "root",
  })
  export class PassCreateService {
  headerToken: any;
  api: string = '';

  constructor(private http: HttpClient, config: EnvironmentService) {
    this.api = `${config.getConfig().apis.Authentication}/usuarios`;
   }
  
  criarSenha(request: PassCreateRequest) {   
    this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    return this.http.post<any>(`${this.api}/create-password`, request, { headers: this.headerToken }).pipe(take(1));
  }

  validarToken(token: string) {
    return this.http.get<ValidateTokenResponse>(`${this.api}/validate-token/${token}`).pipe(take(1));
  }
}
  