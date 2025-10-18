import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PassResetService } from '../services/pass-reset.service';
import { PassResetRequest } from '../models/requests/pass-reset.request';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html'
})

export class PassResetComponent implements OnInit {

  // Login Form
  passresetForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();
  instrucoesEnviadas: boolean = false;
  mensagemErro: string = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private passResetService: PassResetService) { }

  ngOnInit(): void {
     this.passresetForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  get f() { return this.passresetForm.controls; }


   onSubmit() {
    this.submitted = true;

    if (this.passresetForm.invalid) {
      return;
    }

    const request: PassResetRequest = {
      email: this.passresetForm.value.email
    };
    
    this.passResetService.recuperarSenha(request).subscribe({
      next: (response) => 
      {
        this.instrucoesEnviadas = response.enviado;
        this.mensagemErro = '';
      },
      error: (error) =>
      {
        this.instrucoesEnviadas = false;
        this.mensagemErro = error.error.mensagem;
      }
    });
  }

}
