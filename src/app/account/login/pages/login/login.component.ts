import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../core/services/auth.service';
import { ToastService } from '../../services/toast-service';
import { AuthRequest } from 'src/app/core/models/auth.request';
import { AuthResponse } from 'src/app/core/models/auth.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})


export class LoginComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public toastservice: ToastService) {
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
     }

  ngOnInit(): void {
    if(sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      usuario: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

   login() {
    this.submitted = true;

     if (this.loginForm.invalid) 
      return;

     let usuario = this.f['usuario'].value;
     let senha = this.f['senha'].value;

    const request: AuthRequest = {
      cpf: usuario,
      senha: senha,
      tipoEmpresa: 'FROTA'
    };

    this.authenticationService.login(request).subscribe({
      next: (response) => {
        this.setLoggeedInUser(response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toastservice.show(error.error, { classname: 'bg-danger text-white', delay: 15000 });
      }
    });
  }

  setLoggeedInUser(user: AuthResponse) {
    sessionStorage.setItem('toast', 'true');
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    sessionStorage.setItem('token', user.token);
  }
  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  public hasError(controlName: string){
    let control = this.f[controlName];

    return this.submitted && control?.invalid
  }
}
