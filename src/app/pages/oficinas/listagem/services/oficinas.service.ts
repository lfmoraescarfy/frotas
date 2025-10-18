import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { EnvironmentService } from "src/app/config/environment.service";
import { Oficina } from "../models/oficina.model";

@Injectable({
    providedIn: "root",
  })
  export class OficinaService {
    headerToken: any;
    api: string = '';

    constructor(private http: HttpClient, config: EnvironmentService) {
      this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
      this.api = `${config.getConfig().apis.Oficinas}/oficinas`;
    }
  
    get() {
      return this.http.get<Oficina[]>(`${this.api}/get-active`, { headers: this.headerToken }).pipe(take(1));
    }
  }
  