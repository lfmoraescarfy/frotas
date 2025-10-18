import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { AuthRequest } from '../models/auth.request';
import { AuthResponse } from '../models/auth.response';
import { UpdateSenhaRequest } from '../models/requests/update-senha.request';
import { User } from '../models/auth.models';
import { EnvironmentService } from 'src/app/config/environment.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    user!: User;
    currentUserValue: any;
    headerToken: any;
    api: string = '';

    private currentUserSubject: BehaviorSubject<User>;

    constructor(private http: HttpClient, config: EnvironmentService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')!));
        this.api = `${config.getConfig().apis.Authentication}/usuarios`;
    }

    login(request: AuthRequest) {
        return this.http.post<AuthResponse>(`${this.api}/authenticate`, request).pipe(take(1));
    }

    public currentUser(): any {
        return this.getAuthenticatedUser();
    }

    logout() {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
        this.currentUserSubject.next(null!);

        return of(undefined).pipe();
    }

    getAuthenticatedUser(){
        if (!sessionStorage.getItem('currentUser')) {
            return null;
        }
        return JSON.parse(sessionStorage.getItem('currentUser')!);
    }

    updatePassword(request: UpdateSenhaRequest){
        this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
        return this.http.put<any>(`${this.api}/update-password`, request, { headers: this.headerToken }).pipe(take(1));
    }

    updateProfile(request: any){
        this.headerToken = { 'Authorization': `Bearer ` + sessionStorage.getItem('token') };
        return this.http.put<any>(`${this.api}/update-profile`, request, { headers: this.headerToken }).pipe(take(1));
    }
}

