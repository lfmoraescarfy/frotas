import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { Endereco } from "../models/endereco.model";
import { EnvironmentService } from "src/app/config/environment.service";

@Injectable({
    providedIn: 'root',
  })
  export class CepService {
    headerToken: any;
    api: string = '';
    apiCidades: string = '';

    constructor(private http: HttpClient, config: EnvironmentService) {
      this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
      this.api = `${config.getConfig().apis.Cep}`;
      this.apiCidades = `${config.getConfig().apis.OnBoarding}/cidades`;
    }
  
    getEndereco(cep: string) {
        return this.http.get<Endereco>(`${this.api}/${cep}/json`).pipe(take(1));
    }

    getCidades() {
      return this.http.get<any[]>(`${this.apiCidades}`, { headers: this.headerToken }).pipe(take(1));
    }

    getCidadesPorUf(uf: string) {
      return this.http.get<any[]>(`${this.apiCidades}/${uf}`, { headers: this.headerToken }).pipe(take(1));
    }
  }
  