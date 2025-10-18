import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { AddUsuarioRequest } from "../models/requests/add-usuario.request";
import { EnvironmentService } from "src/app/config/environment.service";

@Injectable({
    providedIn: "root",
  })
  export class UsuarioService {
    headerToken: any;
    api: string = '';

    constructor(private http: HttpClient, config: EnvironmentService) {
      this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
      this.api = `${config.getConfig().apis.Authentication}/usuarios`;
    }
  
    getActive() {
      return this.http.get<any[]>(`${this.api}/get-active`, { headers: this.headerToken }).pipe(take(1));
    }
  
    create(request: AddUsuarioRequest) {
      return this.http.post<any>(`${this.api}`, request, { headers: this.headerToken }).pipe(take(1));
    }

    update(request: AddUsuarioRequest) {
      return this.http.put<any>(`${this.api}`, request, { headers: this.headerToken }).pipe(take(1));
    }
  
    delete(id: string) {
      return this.http.delete<any>(`${this.api}?id=${id}`, { headers: this.headerToken }).pipe(take(1));
    }
  }
  