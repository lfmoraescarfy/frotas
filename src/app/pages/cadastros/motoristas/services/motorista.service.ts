import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { EnvironmentService } from "src/app/config/environment.service";
import { AddMotoristaRequest } from "../models/requests/add-motorista.request";
import { UpdateMotoristaRequest } from "../models/requests/update-motorista.request";

@Injectable({
    providedIn: "root",
  })
  export class MotoristasService {
    headerToken: any;
    api: string = '';

    constructor(private http: HttpClient, config: EnvironmentService) {
      this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
      this.api = `${config.getConfig().apis.OnBoarding}/motoristas`;
    }
  
    getActive() {
      return this.http.get<any>(`${this.api}/get-by-empresa`, { headers: this.headerToken }).pipe(take(1));
    }
  
    create(request: AddMotoristaRequest) {
      return this.http.post<any>(`${this.api}`, request, { headers: this.headerToken }).pipe(take(1));
    }

    update(request: UpdateMotoristaRequest) {
        return this.http.put<any>(`${this.api}`, request, { headers: this.headerToken }).pipe(take(1));
    }

    delete(id: string) {
      return this.http.delete<any>(`${this.api}?id=${id}`, { headers: this.headerToken }).pipe(take(1));
    }

     import(request: any) {
      return this.http.post<any>(`${this.api}/importar`, request, { headers: this.headerToken }).pipe(take(1));
    }
  }
  
