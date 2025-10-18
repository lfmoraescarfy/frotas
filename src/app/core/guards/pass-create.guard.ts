import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { PassCreateService } from 'src/app/account/pass-create/services/pass-create.service';

@Injectable({
  providedIn: 'root'
})
export class PassCreateGuard implements CanActivate {
  constructor(
    private router: Router,
    private passCreateService: PassCreateService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = next.paramMap.get('token') || '';

    sessionStorage.setItem('token', token);
    
    return this.passCreateService.validarToken(token).pipe(
      map(response => {
        if (response.isValid) {
          sessionStorage.removeItem('error-message');
          return true;
        } else {
          sessionStorage.setItem('error-message', response.mensagem);
          this.clear();
          return false;
        }
      }),
      catchError((error) => {
        console.log(error);
        this.clear();
        return of(false);
      })
    );
  }

  clear(){
    sessionStorage.removeItem('token');
    this.router.navigate(['/auth/not-found']);
  }
}