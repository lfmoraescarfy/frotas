import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { AddVeiculoRequest } from "../models/add-veiculo.request";
import { EnvironmentService } from "src/app/config/environment.service";

@Injectable({
    providedIn: "root",
  })
  export class VeiculosService {
    headerToken: any;
    api: string = '';

    constructor(private http: HttpClient, config: EnvironmentService) {
      this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
      this.api = `${config.getConfig().apis.Veiculos}/veiculos`;
    }
  
    getActive() {
      return this.http.get<any[]>(`${this.api}/get-active`, { headers: this.headerToken }).pipe(take(1));
    }

    getByPlaca(placa: string) {
      return this.http.get<any>(`${this.api}/get-by-placa/${placa}`, { headers: this.headerToken }).pipe(take(1));
    }
  
    create(request: AddVeiculoRequest) {
      return this.http.post<any>(`${this.api}`, request, { headers: this.headerToken }).pipe(take(1));
    }

    update(request: AddVeiculoRequest) {
      return this.http.put<any>(`${this.api}`, request, { headers: this.headerToken }).pipe(take(1));
    }
  
    delete(id: string) {
      return this.http.delete<any>(`${this.api}?id=${id}`, { headers: this.headerToken }).pipe(take(1));
    }
  }
  