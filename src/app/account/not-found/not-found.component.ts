import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})

/**
 * 404 Alt Component
 */
export class NotFoundComponent implements OnInit {

  mensagem: string = '';

  constructor() { }

  ngOnInit(): void {
    this.mensagem = localStorage.getItem('error-message') ?? '';
  }

}
