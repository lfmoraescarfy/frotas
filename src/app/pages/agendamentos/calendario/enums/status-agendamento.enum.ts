export enum StatusAgendamento {
    Aberto = 'A',
    Compareceu = 'C',
    NaoCompareceu = 'N'
}

export const StatusAgendamentoLabel = new Map<string, string>([
    ['A', 'Em Aberto'],
    ['C', 'Compareceu'],
    ['N', 'Não Compareceu'],
]);