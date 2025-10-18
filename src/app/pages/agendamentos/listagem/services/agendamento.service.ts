import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { EmailNoShowRequest } from "../models/requests/email-no-show.request";
import { EnvironmentService } from "src/app/config/environment.service";

@Injectable({
    providedIn: "root",
  })
  export class AgendamentoService {
    headerToken: any;
    api: string = '';

    constructor(private http: HttpClient, config: EnvironmentService) {
      this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
      this.api = `${config.getConfig().apis.OnBoarding}/agendamentos`;
    }
  
    get() {
      return this.http.get<any[]>(`${this.api}/get-active`, { headers: this.headerToken }).pipe(take(1));
    }

    getByStatus(status: string) {
      return this.http.get<any[]>(`${this.api}/get-by-status/${status}`, { headers: this.headerToken }).pipe(take(1));
    }

    sendEmailNoShow(request: EmailNoShowRequest) {
      return this.http.post<any>(`${this.api}/send-no-show-email`, request, { headers: this.headerToken }).pipe(take(1));
    }
  }
  