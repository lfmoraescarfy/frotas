import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { EnvironmentService } from "src/app/config/environment.service";
import { Veiculo } from "../../veiculos/models/veiculo.model";
import { DownloadFrotaRequest } from "../models/requests/download-frota.request";

@Injectable({
    providedIn: "root",
  })
  export class FrotasService {
    headerToken: any;
    api: string = '';

    constructor(private http: HttpClient, config: EnvironmentService) {
      this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
      this.api = `${config.getConfig().apis.OnBoarding}/frotas`;
    }
  
    getActive() {
      return this.http.get<any>(`${this.api}/get-by-empresa`, { headers: this.headerToken }).pipe(take(1));
    }
  
    add(idVeiculo: string) {
      return this.http.post<any>(`${this.api}?idVeiculo=${idVeiculo}`, { headers: this.headerToken }).pipe(take(1));
    }

    delete(id: string) {
      return this.http.delete<any>(`${this.api}?idVeiculo=${id}`, { headers: this.headerToken }).pipe(take(1));
    }

    import(request: any) {
      return this.http.post<any>(`${this.api}/importar`, request, { headers: this.headerToken }).pipe(take(1));
    }

    download(request: DownloadFrotaRequest) {
      return this.http.post<any>(`${this.api}/download`, request, { headers: this.headerToken }).pipe(take(1));
    }
  }
  
