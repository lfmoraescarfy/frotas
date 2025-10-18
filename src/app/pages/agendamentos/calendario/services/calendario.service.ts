import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { UpdateAgendamentoRequest } from "../models/requests/update-agendamento.request";
import { createHttpParams } from "src/app/shared/http-params";
import { AddAgendamentoResponse } from "../models/responses/add-agendamento.response";
import { UpdateStatusAgendamentoRequest } from "../models/requests/update-status-agendamento.request";
import { EnvironmentService } from "src/app/config/environment.service";

@Injectable({
    providedIn: "root",
  })
  export class CalendarioService {
    headerToken: any;
    api: string = '';

  constructor(private http: HttpClient, config: EnvironmentService) {
    this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
    this.api = `${config.getConfig().apis.OnBoarding}/agendamentos`;
  }
  
  getActive() {
    return this.http.get<any[]>(`${this.api}/get-active`, { headers: this.headerToken }).pipe(take(1));
  }

  getAbertos() {
    return this.http.get<any[]>(`${this.api}/get-abertos`, { headers: this.headerToken }).pipe(take(1));
  }

  create(request: any){
    return this.http.post<AddAgendamentoResponse>(`${this.api}`, request, { headers: this.headerToken }).pipe(take(1));
  }

  update(request: UpdateAgendamentoRequest) {
    return this.http.put<any>(`${this.api}/cancelar`, request, { headers: this.headerToken }).pipe(take(1));
  }

  updateStatus(request: UpdateStatusAgendamentoRequest){
    return this.http.put<any>(`${this.api}/atualizar-status`, request, { headers: this.headerToken }).pipe(take(1));
  }

  getHorariosLivresByDate(request: any) {   
    const params: HttpParams = createHttpParams(request);
    
    return this.http.get<any[]>(`${this.api}/get-horarios-livres-by-date`, { params }).pipe(take(1));
  }
}
  