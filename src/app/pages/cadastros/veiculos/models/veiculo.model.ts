export interface Veiculo {
  id: string;
  idEmpresa: string;
  placa: string;
  marca: string;
  modelo: string;
  cor: string;
  anoModelo: number;
  anoFabricacao: number;
  criadoEm: Date;
  excluidoEm?: Date;
}