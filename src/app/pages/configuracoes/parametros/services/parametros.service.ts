import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { EnvironmentService } from "src/app/config/environment.service";
import { LogoEmpresaResponse } from "../models/responses/logo-empresa.response";

@Injectable({
    providedIn: "root",
  })
  export class ParametrosService {
    headerToken: any;
    api: string = '';

    constructor(private http: HttpClient, config: EnvironmentService) {
      this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
      this.api = `${config.getConfig().apis.OnBoarding}/empresas`;
    }
  
    get(id: string) {
      return this.http.get<any>(`${this.api}/get-by-id/${id}`, { headers: this.headerToken }).pipe(take(1));
    }

    getLogo(id: string) {
      return this.http.get<LogoEmpresaResponse>(`${this.api}/get-logo/${id}`, { headers: this.headerToken }).pipe(take(1));
    }

    update(request: any) {
      return this.http.put<any>(`${this.api}`, request, { headers: this.headerToken }).pipe(take(1));
    }

    updateLogo(request: any) {
      return this.http.put<any>(`${this.api}/update-logo`, request, { headers: this.headerToken }).pipe(take(1));
    }

    updateParametros(request: any) {
      return this.http.put<any>(`${this.api}/update-parametros`, request, { headers: this.headerToken }).pipe(take(1));
    }
  }
  