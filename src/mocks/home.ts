export const videoUrl = "https://static.readdy.ai/video/e73bebd414cf79f29957abdba095e0a8/c45f137b27c5f4cf054e5d516c7e05c9.mp4";

export const videoCover = "https://static.readdy.ai/image/3dbb1efaf739131a42f7bf8698b1c268/93140fd321a26ac604e28b6a57e353bd.jpeg";

export const videoDuration = 14;

// Cada plano é uma "casinha" com aluguel mensal recorrente.
// Ao entrar, o vizinho recebe um baú para abrir e ganha o SaaS de Criativos.
export const plans = [
  {
    id: 1,
    name: "Casinha Semente",
    price: "R$ 60,00",
    valorMensal: 60,
    aluguel: "R$ 60,00 por mês",
    produto: "Casinha digital de entrada + rede",
    bau: "Baú + SaaS de Criativos",
    nivel: "Rede do 1º ao 10º nível",
    indicacoes: "2 vizinhos",
    tagline: "A porta de entrada mais enxuta da vizinhança: comece com R$ 60,00 por mês.",
    descricao:
      "A forma mais leve de entrar na vizinhança. Por R$ 60,00 por mês você ativa a sua casinha semente, recebe o baú de boas-vindas e já entra na matriz fechada de 10 níveis, começando a acumular comissões a cada indicação confirmada.",
    included: [
      "Casinha semente ativa na rede",
      "Acesso do 1º ao 10º nível da matriz",
      "Baú de boas-vindas para abrir",
      "SaaS de Criativos para Redes Sociais",
      "Painel do vizinho com saldo e extrato",
      "Suporte da comunidade",
    ],
    image:
      "https://readdy.ai/api/search-image?query=Small%20rustic%20wooden%20garden%20shed%20cottage%20at%20dusk%20nestled%20among%20plants%2C%20one%20warm%20amber%20lantern%20glowing%20at%20the%20door%2C%20deep%20teal%20night%20shadows%2C%20starter%20home%20of%20a%20community%20village%2C%20cinematic%20wide%20shot%2C%20atmospheric%20haze%2C%20stylized%20artistic%20illustration%2C%20no%20people%2C%20moody%20warm%20gold%20light&width=1600&height=900&seq=ch-plan-semente-060&orientation=landscape",
  },
  {
    id: 2,
    name: "Casinha Vizinho",
    price: "R$ 100,00",
    valorMensal: 100,
    aluguel: "R$ 100,00 por mês",
    produto: "Casinha digital + acesso à rede",
    bau: "Baú + SaaS de Criativos",
    nivel: "Rede do 1º ao 10º nível",
    indicacoes: "2 vizinhos",
    tagline: "Sua primeira casinha completa na vizinhança, a partir de R$ 100.",
    descricao:
      "A porta de entrada clássica da vizinhança. Com a Casinha Vizinho você já entra na matriz fechada de 10 níveis, recebe o baú de boas-vindas e começa a acumular comissões a cada indicação confirmada.",
    included: [
      "Casinha digital ativa na rede",
      "Acesso do 1º ao 10º nível da matriz",
      "Baú de boas-vindas para abrir",
      "SaaS de Criativos para Redes Sociais",
      "Painel do vizinho com saldo e extrato",
      "Suporte da comunidade",
    ],
    image:
      "https://readdy.ai/api/search-image?query=Cozy%20small%20wooden%20cottage%20at%20dusk%20with%20warm%20amber%20lanterns%20glowing%20on%20the%20porch%2C%20deep%20teal%20night%20shadows%2C%20rustic%20community%20village%2C%20cinematic%20wide%20shot%2C%20atmospheric%20haze%2C%20stylized%20artistic%20illustration%2C%20no%20people%2C%20moody%20warm%20gold%20light&width=1600&height=900&seq=ch-plan-casinha-100&orientation=landscape",
  },
  {
    id: 3,
    name: "Casa Vizinho",
    price: "R$ 200,00",
    valorMensal: 200,
    aluguel: "R$ 200,00 por mês",
    produto: "Casa digital completa + rede",
    bau: "Baú + SaaS de Criativos",
    nivel: "Rede do 1º ao 10º nível",
    indicacoes: "2 vizinhos",
    tagline: "A casa completa: mais espaço na rede e aluguel maior.",
    descricao:
      "Para quem quer acelerar. A Casa Vizinho traz o mesmo motor da rede MMN de 10 níveis, mas com aluguel maior — e isso reflete direto no valor da sua indicação direta, que é sempre 50% do aluguel.",
    included: [
      "Casa digital completa na rede",
      "Acesso do 1º ao 10º nível da matriz",
      "Baú de boas-vindas para abrir",
      "SaaS de Criativos para Redes Sociais",
      "Pacote de aulas em vídeo da comunidade",
      "Painel do vizinho com saldo e extrato",
      "Suporte prioritário",
    ],
    image:
      "https://readdy.ai/api/search-image?query=Two%20story%20rustic%20wooden%20house%20at%20dusk%20with%20warm%20amber%20window%20lights%2C%20deep%20teal%20night%20shadows%2C%20countryside%20community%20village%20path%2C%20cinematic%20wide%20shot%2C%20atmospheric%20haze%2C%20stylized%20artistic%20illustration%2C%20no%20people%2C%20moody%20warm%20gold%20light&width=1600&height=900&seq=ch-plan-casa-200&orientation=landscape",
  },
  {
    id: 4,
    name: "Casa Vizinho Master",
    price: "R$ 500,00",
    valorMensal: 500,
    aluguel: "R$ 500,00 por mês",
    produto: "Casa master + mentoria + rede",
    bau: "Baú + SaaS de Criativos",
    nivel: "Rede do 1º ao 10º nível",
    indicacoes: "2 vizinhos",
    tagline: "A casa master: aluguel maior, rede maior, mentoria junto.",
    descricao:
      "O plano mais alto da vizinhança. Aluguel de R$ 500,00 por mês, mentoria direta e todos os níveis da matriz liberados. Quanto maior o aluguel, maior o valor da indicação direta e maior o giro da sua rede.",
    included: [
      "Casa master digital na rede",
      "Acesso do 1º ao 10º nível da matriz",
      "Baú de boas-vindas para abrir",
      "SaaS de Criativos para Redes Sociais",
      "Mentoria direta com o time da vizinhança",
      "Kit completo de cursos em vídeo e templates",
      "Painel do vizinho com saldo e extrato",
      "Suporte prioritário e grupo VIP",
    ],
    image:
      "https://readdy.ai/api/search-image?query=Grand%20rustic%20wooden%20manor%20house%20at%20dusk%20with%20rows%20of%20warm%20amber%20lanterns%20glowing%2C%20deep%20teal%20night%20shadows%2C%20elevated%20community%20village%20setting%2C%20cinematic%20wide%20shot%2C%20atmospheric%20haze%2C%20stylized%20artistic%20illustration%2C%20no%20people%2C%20moody%20warm%20gold%20light&width=1600&height=900&seq=ch-plan-master-500&orientation=landscape",
  },
];

// Regras de distribuição do aluguel na rede de multinível (MMN).
export const networkRules = [
  { label: "Indicação direta", value: "50% do aluguel", icon: "ri-share-forward-line" },
  { label: "Cada nível (1º ao 10º)", value: "R$ 25,00 fixos", icon: "ri-flow-chart" },
  { label: "Profundidade da rede", value: "10 níveis", icon: "ri-node-tree" },
  { label: "Matriz", value: "Fechada · 2 por pessoa", icon: "ri-group-line" },
  { label: "Aluguel", value: "Recorrente todo mês", icon: "ri-calendar-check-line" },
];

// Tabela de distribuição por nível — R$ 25,00 fixos em cada um dos 10 níveis.
export const networkLevelTiers = [
  { nivel: 1, valor: "R$ 25,00" },
  { nivel: 2, valor: "R$ 25,00" },
  { nivel: 3, valor: "R$ 25,00" },
  { nivel: 4, valor: "R$ 25,00" },
  { nivel: 5, valor: "R$ 25,00" },
  { nivel: 6, valor: "R$ 25,00" },
  { nivel: 7, valor: "R$ 25,00" },
  { nivel: 8, valor: "R$ 25,00" },
  { nivel: 9, valor: "R$ 25,00" },
  { nivel: 10, valor: "R$ 25,00" },
];

export const panelStats = [
  { label: "Vizinhos na comunidade", value: 12480, suffix: "+" },
  { label: "Níveis de rede", value: 10, suffix: "" },
  { label: "Baús de boas-vindas abertos", value: 9150, suffix: "" },
  { label: "Dias de recorrência do aluguel", value: 30, suffix: "" },
];

export const chestTiers = [
  {
    plano: "Entrada em qualquer casinha",
    bau: "Baú de boas-vindas",
    premio: "SaaS de Criativos para Redes Sociais",
  },
];

export const networkLevels = [
  { nivel: "1º nível", descricao: "Sua indicação direta recebe 50% do valor do aluguel." },
  { nivel: "2º nível", descricao: "Cada vizinho que entra pelos seus indicados paga R$ 25,00 fixos." },
  { nivel: "3º ao 10º nível", descricao: "A comissão de R$ 25,00 continua em todos os níveis, até o 10º." },
  { nivel: "Matriz fechada", descricao: "Cada vizinho precisa indicar 2 pessoas para a casa ficar ativa." },
  { nivel: "Renovação", descricao: "O aluguel é recorrente: todo mês a casa renova e continua rendendo." },
];

export const faqItems = [
  {
    q: "Preciso indicar 2 vizinhos para começar a receber?",
    a: "Sim. Cada vizinho precisa indicar 2 pessoas para a casa ficar ativa na matriz fechada. Sem as duas indicações, as comissões dos níveis ficam bloqueadas.",
  },
  {
    q: "Como funciona o aluguel mensal?",
    a: "O aluguel da sua casinha é recorrente: você paga todo mês para manter a casa ativa e rendendo na rede. O ciclo se renova automaticamente a cada 30 dias.",
  },
  {
    q: "O que vem no baú da primeira entrada?",
    a: "Ao entrar em qualquer plano, você recebe um baú de boas-vindas para abrir e ganha o SaaS de Criativos para Redes Sociais — o mesmo em todos os planos, a partir de R$ 60,00.",
  },
  {
    q: "Como o valor do aluguel é distribuído?",
    a: "A indicação direta recebe 50% do valor do aluguel, e cada um dos 10 níveis recebe R$ 25,00 fixos por indicação que entra pela rede em matriz fechada.",
  },
  {
    q: "Qual é o valor mínimo de saque?",
    a: "O saque mínimo é de R$ 10,00, com uma taxa fixa de R$ 2,00 por saque processado.",
  },
];

export const testimonials = [
  {
    nome: "Dona Cleide",
    cidade: "Feira de Santana, BA",
    texto: "Comecei na casinha de R$ 100 e recebi o baú com o SaaS de criativos. Em três semanas já tinha meus 2 vizinhos e a casa ficou ativa.",
  },
  {
    nome: "Marcos Vinícius",
    cidade: "João Pessoa, PB",
    texto: "O aluguel recorrente clareou tudo pra mim. Eu sei quanto pago todo mês e quanto a rede me devolve nos 10 níveis.",
  },
  {
    nome: "Rafaela Sousa",
    cidade: "Cuiabá, MT",
    texto: "Subi para a Casa Master de R$ 500 porque o aluguel maior rende mais nos níveis. Hoje o saque cai direto na conta.",
  },
];