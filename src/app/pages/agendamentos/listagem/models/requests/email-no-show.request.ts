export interface EmailNoShowRequest {
    idAgendamento: string;
    data: Date;
    nomeCliente: string;
    whatsAppCliente: string; 
    emailCliente: string;
    observacoes: string;
}