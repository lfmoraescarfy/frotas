import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PassCreateRequest } from '../models/requests/pass-create.request';
import { PassCreateService } from '../services/pass-create.service';
import { HttpStatus } from 'src/app/shared/enums/http-status.enum';
import { Router } from '@angular/router';
import { PasswordValidator } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-pass-create',
  templateUrl: './pass-create.component.html',
})

export class PassCreateComponent implements OnInit, AfterViewInit {

   // Login Form
   passresetForm!: UntypedFormGroup;
   submitted = false;
   sucesso: boolean = false;
   passwordField!: boolean;
   confirmField!: boolean;
   error = '';
   mensagemErro: string = '';
   returnUrl!: string;
  title: string = 'Criar nova senha';

   // set the current year
   year: number = new Date().getFullYear();

   constructor(
    private formBuilder: UntypedFormBuilder,
    private passCreateService: PassCreateService,
    private router: Router
   ) { }

 
   ngOnInit(): void {
     /**
      * Form Validatyion
      */
      this.passresetForm = this.formBuilder.group({
       password: ['', [Validators.required]],
       cpassword: ['', [Validators.required, PasswordValidator.match('password')]]
     });
   }
 
  ngAfterViewInit(): void {
    this.setValidations();
  }

   get f() { return this.passresetForm.controls; }
 

    onSubmit() {
     this.submitted = true;
 
     if (this.passresetForm.invalid) {
       return;
     }

     const request: PassCreateRequest = {
      senha: this.passresetForm.value.password
     }

     this.passCreateService.criarSenha(request).subscribe({
        next: (response) => 
        {
          this.sucesso = response;
          this.mensagemErro = '';
          this.title = 'Senha atualizada com sucesso!'
        },
        error: (error) =>
        {
          if(error.status == HttpStatus.Unauthorized)
            this.router.navigate(['/auth/not-found']);

          this.sucesso = false;
          this.mensagemErro = error.error.message;
        }
      });
   }

    togglepasswordField() {
      this.passwordField = !this.passwordField;
    }

    toggleconfirmField() {
      this.confirmField = !this.confirmField;
    }

    setValidations(){
      // Password Validation set
      var myInput = document.getElementById("password-input") as HTMLInputElement;
      var myConfirmInput = document.getElementById("confirm-password-input") as HTMLInputElement;
      var letter = document.getElementById("pass-lower");
      var capital = document.getElementById("pass-upper");
      var number = document.getElementById("pass-number");
      var length = document.getElementById("pass-length");
      var combine = document.getElementById("pass-combine");

     // When the user clicks on the password field, show the message box
      myInput.onfocus = function () {
        let input = document.getElementById("password-contain") as HTMLElement;
        input.style.display = "block"
      };

      // When the user starts to type something inside the password field
      myInput.onkeyup = function () {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if (myInput.value.match(lowerCaseLetters)) {
            letter?.classList.remove("invalid");
            letter?.classList.add("valid");
        } else {
            letter?.classList.remove("valid");
            letter?.classList.add("invalid");
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (myInput.value.match(upperCaseLetters)) {
            capital?.classList.remove("invalid");
            capital?.classList.add("valid");
        } else {
            capital?.classList.remove("valid");
            capital?.classList.add("invalid");
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
            number?.classList.remove("invalid");
            number?.classList.add("valid");
        } else {
            number?.classList.remove("valid");
            number?.classList.add("invalid");
        }

        // Validate length
        if (myInput.value.length >= 8) {
            length?.classList.remove("invalid");
            length?.classList.add("valid");
        } else {
            length?.classList.remove("valid");
            length?.classList.add("invalid");
        }

           // Validate combine
       if (myInput.value == myConfirmInput.value) {
            combine?.classList.remove("invalid");
            combine?.classList.add("valid");
        } else {
            combine?.classList.remove("valid");
            combine?.classList.add("invalid");
        }
      };

      myConfirmInput.onkeyup = function () {
        if (myInput.value == myConfirmInput.value) {
            combine?.classList.remove("invalid");
            combine?.classList.add("valid");
        } else {
            combine?.classList.remove("valid");
            combine?.classList.add("invalid");
        }
      };
    }
}
