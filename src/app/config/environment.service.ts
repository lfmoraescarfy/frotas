import { Injectable } from "@angular/core";
import { Env } from "./environment.config";
declare var require: any;

@Injectable({
    providedIn: "root",
})
export class EnvironmentService {
    private config!: Env;
  
  constructor(){
    this.loadConfig();
  }

    getConfig() {
      return this.config;
    }

    loadConfig(): Promise<Env> {
        return new Promise((resolve, reject) => {
          this.config = require('./environment.config.json')[window.location.hostname];
        });
      }
}