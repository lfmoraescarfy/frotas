export enum PerfilEnum {
    Administrador = 1,
    Consultor = 2,
    Mecanico = 3
}

export const PerfilLabel = new Map<number, string>([
    [PerfilEnum.Administrador, 'Administrador'],
    [PerfilEnum.Consultor, 'Consultor'],
    [PerfilEnum.Mecanico, 'Mecânico'],
]);