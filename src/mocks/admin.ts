export const adminKpis = [
  { label: "Vizinhos ativos", value: "2.418", delta: "+12,4% no mês", icon: "ri-group-line" },
  { label: "Casas ativas", value: "1.657", delta: "+6,2% no mês", icon: "ri-home-smile-line" },
  { label: "Indicações confirmadas", value: "5.902", delta: "+8,1% no mês", icon: "ri-share-forward-line" },
  { label: "Saques pendentes", value: "R$ 18.740", delta: "42 solicitações", icon: "ri-bank-card-line" },
];

// Configuração central da rede MMN — controlada pelo administrador.
export const networkConfig = {
  directPercent: 50,
  levelValue: 25,
  levels: 10,
  requiredPerNeighbor: 2,
  matrixType: "Fechada",
  cycleDays: 30,
  minWithdraw: 10,
  withdrawFee: 2,
};

export const weekly = [
  { dia: "Seg", indicacoes: 128, valor: 4120 },
  { dia: "Ter", indicacoes: 164, valor: 5380 },
  { dia: "Qua", indicacoes: 143, valor: 4610 },
  { dia: "Qui", indicacoes: 191, valor: 6240 },
  { dia: "Sex", indicacoes: 236, valor: 7890 },
  { dia: "Sáb", indicacoes: 208, valor: 6720 },
  { dia: "Dom", indicacoes: 149, valor: 4830 },
];

export const members = [
  { id: "VZ-1042", nome: "Maria Vizinho", email: "maria@email.com", plano: "Casa Vizinho · R$ 200", nivel: 6, indicacoes: 24, ciclo: 12, status: "Ativo" },
  { id: "VZ-1043", nome: "João Batista", email: "joao@email.com", plano: "Casinha Vizinho · R$ 100", nivel: 2, indicacoes: 5, ciclo: 28, status: "Ativo" },
  { id: "VZ-1044", nome: "Cleide Ferreira", email: "cleide@email.com", plano: "Casinha Vizinho · R$ 100", nivel: 1, indicacoes: 2, ciclo: 30, status: "Renovando" },
  { id: "VZ-1045", nome: "Marcos Vinícius", email: "marcos@email.com", plano: "Casa Vizinho Master · R$ 500", nivel: 7, indicacoes: 41, ciclo: 6, status: "Ativo" },
  { id: "VZ-1046", nome: "Rafaela Sousa", email: "rafaela@email.com", plano: "Casa Vizinho · R$ 200", nivel: 4, indicacoes: 17, ciclo: 19, status: "Ativo" },
  { id: "VZ-1047", nome: "Antônio Carlos", email: "antonio@email.com", plano: "Casinha Vizinho · R$ 100", nivel: 3, indicacoes: 9, ciclo: 25, status: "Pendente" },
  { id: "VZ-1048", nome: "Juliana Prado", email: "juliana@email.com", plano: "Casa Vizinho Master · R$ 500", nivel: 8, indicacoes: 63, ciclo: 3, status: "Ativo" },
  { id: "VZ-1049", nome: "Pedro Henrique", email: "pedro@email.com", plano: "Casinha Vizinho · R$ 100", nivel: 1, indicacoes: 1, ciclo: 22, status: "Aguardando 2ª indicação" },
];

export const referrals = [
  { id: "IN-9021", indicador: "Maria Vizinho", indicado: "Lucas Andrade", plano: "Casa Vizinho · R$ 200", valor: "R$ 200,00", data: "30/09/2026", status: "Confirmada" },
  { id: "IN-9022", indicador: "Marcos Vinícius", indicado: "Bruna Lima", plano: "Casa Vizinho Master · R$ 500", valor: "R$ 500,00", data: "30/09/2026", status: "Confirmada" },
  { id: "IN-9023", indicador: "Rafaela Sousa", indicado: "Diego Nunes", plano: "Casa Vizinho · R$ 200", valor: "R$ 200,00", data: "29/09/2026", status: "Confirmada" },
  { id: "IN-9024", indicador: "Juliana Prado", indicado: "Camila Reis", plano: "Casa Vizinho Master · R$ 500", valor: "R$ 500,00", data: "29/09/2026", status: "Em análise" },
  { id: "IN-9025", indicador: "João Batista", indicado: "Sérgio Maia", plano: "Casinha Vizinho · R$ 100", valor: "R$ 100,00", data: "28/09/2026", status: "Confirmada" },
  { id: "IN-9026", indicador: "Cleide Ferreira", indicado: "Helena Duarte", plano: "Casinha Vizinho · R$ 100", valor: "R$ 100,00", data: "28/09/2026", status: "Confirmada" },
  { id: "IN-9027", indicador: "Pedro Henrique", indicado: "Igor Menezes", plano: "Casinha Vizinho · R$ 100", valor: "R$ 100,00", data: "27/09/2026", status: "Confirmada" },
  { id: "IN-9028", indicador: "Antônio Carlos", indicado: "Vanessa Pires", plano: "Casinha Vizinho · R$ 100", valor: "R$ 100,00", data: "27/09/2026", status: "Cancelada" },
];

export const chests = [
  { id: "BAU-3310", vizinho: "Maria Vizinho", plano: "Casa Vizinho · R$ 200", premio: "SaaS de Criativos", data: "30/09/2026" },
  { id: "BAU-3311", vizinho: "Marcos Vinícius", plano: "Casa Vizinho Master · R$ 500", premio: "SaaS de Criativos", data: "30/09/2026" },
  { id: "BAU-3312", vizinho: "Rafaela Sousa", plano: "Casa Vizinho · R$ 200", premio: "SaaS de Criativos", data: "29/09/2026" },
  { id: "BAU-3313", vizinho: "João Batista", plano: "Casinha Vizinho · R$ 100", premio: "SaaS de Criativos", data: "29/09/2026" },
  { id: "BAU-3314", vizinho: "Cleide Ferreira", plano: "Casinha Vizinho · R$ 100", premio: "SaaS de Criativos", data: "28/09/2026" },
  { id: "BAU-3315", vizinho: "Antônio Carlos", plano: "Casinha Vizinho · R$ 100", premio: "SaaS de Criativos", data: "28/09/2026" },
];

export const withdrawals = [
  { id: "SAQ-771", vizinho: "Marcos Vinícius", bruto: "R$ 640,00", taxa: "R$ 2,00", liquido: "R$ 638,00", data: "30/09/2026", status: "Pendente" },
  { id: "SAQ-772", vizinho: "Juliana Prado", bruto: "R$ 1.200,00", taxa: "R$ 2,00", liquido: "R$ 1.198,00", data: "30/09/2026", status: "Pendente" },
  { id: "SAQ-773", vizinho: "Maria Vizinho", bruto: "R$ 380,00", taxa: "R$ 2,00", liquido: "R$ 378,00", data: "29/09/2026", status: "Pago" },
  { id: "SAQ-774", vizinho: "Rafaela Sousa", bruto: "R$ 210,00", taxa: "R$ 2,00", liquido: "R$ 208,00", data: "28/09/2026", status: "Pago" },
  { id: "SAQ-775", vizinho: "Pedro Henrique", bruto: "R$ 10,00", taxa: "R$ 2,00", liquido: "R$ 8,00", data: "28/09/2026", status: "Recusado" },
  { id: "SAQ-776", vizinho: "João Batista", bruto: "R$ 92,00", taxa: "R$ 2,00", liquido: "R$ 90,00", data: "27/09/2026", status: "Pago" },
];

export const adminPlans = [
  { id: 1, nome: "Casinha Vizinho", aluguel: 100, bau: "Baú + SaaS de Criativos", assinantes: 812, ativo: true },
  { id: 2, nome: "Casa Vizinho", aluguel: 200, bau: "Baú + SaaS de Criativos", assinantes: 604, ativo: true },
  { id: 3, nome: "Casa Vizinho Master", aluguel: 500, bau: "Baú + SaaS de Criativos", assinantes: 241, ativo: true },
];

// Matriz fechada 2x10 — cada nível dobra o número de posições.
export const matrixLevels = [
  { level: 1, vizinhos: 2, valor: "R$ 25,00" },
  { level: 2, vizinhos: 4, valor: "R$ 25,00" },
  { level: 3, vizinhos: 8, valor: "R$ 25,00" },
  { level: 4, vizinhos: 16, valor: "R$ 25,00" },
  { level: 5, vizinhos: 32, valor: "R$ 25,00" },
  { level: 6, vizinhos: 64, valor: "R$ 25,00" },
  { level: 7, vizinhos: 128, valor: "R$ 25,00" },
  { level: 8, vizinhos: 256, valor: "R$ 25,00" },
  { level: 9, vizinhos: 512, valor: "R$ 25,00" },
  { level: 10, vizinhos: 1024, valor: "R$ 25,00" },
];