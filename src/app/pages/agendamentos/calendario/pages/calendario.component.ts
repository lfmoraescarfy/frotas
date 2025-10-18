import { Component, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { EventClickArg } from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarioService } from '../services/calendario.service';
import { CALENDARIO_CONFIG } from '../configs/calendario.config';
import { Agendamento } from '../models/agendamento.model';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent {
  breadCrumbItems!: Array<{}>;
  agendamento: any;
  event: any;

  @ViewChild('modalVisualizar') modalVisualizar !: TemplateRef<any>;
  @ViewChild('modalAgendar') modalAgendar !: TemplateRef<any>;

  calendarOptions = CALENDARIO_CONFIG(); 

  constructor(
    private modalService: NgbModal, 
    private changeDetector: ChangeDetectorRef,
    private service: CalendarioService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Agendamentos' },
      { label: 'Calendário', active: true }
    ];   

    this.calendarOptions.select = this.abrirModalAdicionar.bind(this),
    this.calendarOptions.eventClick = this.abrirModalVisualizar.bind(this)
    this.carregarAgendamentos();
  }

  private carregarAgendamentos() {
    this.service.getAbertos().subscribe(
      data => {
        this.calendarOptions.events = data.map(
          (evt: any) => {
            return { 
              id: evt.id,
              date: new Date(evt.dataInicio), 
              allDay: false,
              title: evt.nomeCliente, 
              className: 'bg-primary-subtle', 
              description: evt.observacoes,
              whatsapp: evt.whatsAppCliente
            }
          });
        this.changeDetector.detectChanges();
      }
    );
  }

  abrirModalAdicionar(event?: any) {
    let hoje = new Date();

    if(event.start < hoje) 
      return;

    this.event = event;
    this.modalService.open(this.modalAgendar, { size: 'lg', centered: true });
  }

  abrirModalVisualizar(clickInfo: EventClickArg) {
    this.agendamento = clickInfo.event;
    this.modalService.open(this.modalVisualizar, { centered: true });
  }

  loadAgendamento(agendamento: Agendamento){
    const calendario = this.event.view.calendar;
    calendario.addEvent({
      id: agendamento.id,
      date: new Date(agendamento.data), 
      allDay: false,
      title: agendamento.nome, 
      className: 'bg-primary-subtle', 
      description: agendamento.observacoes,
      whatsapp: agendamento.telefone
    });
  }
}

