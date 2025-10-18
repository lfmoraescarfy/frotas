import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EnvironmentService } from "src/app/config/environment.service";

@Injectable({
    providedIn: "root",
  })
  export class DashboardService {
    headerToken: any;
    api: string = '';

  constructor(private http: HttpClient, config: EnvironmentService) {
    this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
  }
  
}
  