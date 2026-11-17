export type ProductKind = "curso" | "ebook" | "kit" | "mentoria" | "template";

export const kindLabels: Record<ProductKind, string> = {
  curso: "Curso em vídeo",
  ebook: "E-book",
  kit: "Kit digital",
  mentoria: "Mentoria",
  template: "Template",
};

export interface CatalogProduct {
  id: number;
  kind: ProductKind;
  name: string;
  tagline: string;
  description: string;
  price: number;
  oldPrice?: number;
  level: string;
  lessons?: number;
  duration?: string;
  includes: string[];
  image: string;
  featured?: boolean;
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export const heroImage =
  "https://readdy.ai/api/search-image?query=Interior%20of%20a%20dark%20rustic%20workshop%20at%20dusk%20lined%20with%20wooden%20shelves%20of%20books%20and%20old%20film%20reels%2C%20rows%20of%20warm%20amber%20lanterns%20glowing%2C%20deep%20teal%20blue%20shadows%2C%20cinematic%20wide%20shot%2C%20atmospheric%20haze%2C%20gold%20light%20pooling%20on%20a%20wooden%20floor%2C%20no%20people%2C%20moody%20and%20quiet&width=2400&height=1350&seq=iv-catalogo-hero&orientation=landscape";

export const catalogProducts: CatalogProduct[] = [
  {
    id: 1,
    kind: "ebook",
    name: "Guia do Vizinho",
    tagline: "O ponto de partida de todo vizinho que quer começar certo.",
    description:
      "O guia que abre a porta da vizinhança. Explica passo a passo como escolher o seu plano, montar o seu link de indicação e fazer as duas primeiras indicações que liberam a sua recompensa de 50%. Linguagem simples, direto ao ponto, em PDF para ler no celular.",
    price: 10,
    level: "Iniciante",
    duration: "Leitura de 40 min",
    includes: ["E-book em PDF com 6 capítulos", "Checklist dos primeiros 30 dias", "Modelo de mensagem de convite"],
    image:
      "https://readdy.ai/api/search-image?query=Open%20hardcover%20guide%20book%20resting%20on%20a%20dark%20weathered%20wooden%20table%2C%20warm%20amber%20lantern%20light%2C%20a%20small%20golden%20key%20beside%20it%2C%20deep%20dusk%20blue%20shadows%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-guia&orientation=landscape",
  },
  {
    id: 2,
    kind: "curso",
    name: "Adega do Vizinho",
    tagline: "Do zero ao primeiro ciclo de 30 dias rendendo de verdade.",
    description:
      "Curso em vídeo que ensina a estruturar a sua vizinhança como um negócio de recorrência. Cada aula vem com tarefa prática: montar o link, convidar os dois primeiros vizinhos e acompanhar o contador de 30 dias até a renovação.",
    price: 35,
    oldPrice: 49,
    level: "Iniciante",
    lessons: 12,
    duration: "3h20 de vídeo",
    includes: ["12 aulas em vídeo", "Planilha da rede de 10 níveis", "Roteiro de abordagem dos vizinhos"],
    image:
      "https://readdy.ai/api/search-image?query=A%20row%20of%20dark%20wine%20bottles%20in%20a%20rustic%20cellar%20with%20warm%20golden%20rim%20light%2C%20deep%20teal%20shadows%2C%20dust%20floating%20in%20the%20air%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-adega&orientation=landscape",
  },
  {
    id: 3,
    kind: "curso",
    name: "Método Adega Reserva",
    tagline: "Escalone os pacotes e transforme indicação em renda previsível.",
    description:
      "Aprofunda a estratégia dos pacotes livres: como combinar planos, quando subir de nível e como fazer a renda de 50% se repetir a cada renovação. Ideal para quem já entendeu o básico e quer escalar.",
    price: 75,
    level: "Intermediário",
    lessons: 18,
    duration: "5h de vídeo",
    includes: ["18 aulas em vídeo", "Método de escalonamento por nível", "Calculadora de recorrência"],
    image:
      "https://readdy.ai/api/search-image?query=A%20single%20elegant%20wine%20glass%20on%20a%20dark%20slate%20surface%20with%20warm%20amber%20backlight%20and%20deep%20dusk%20blue%20shadows%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-reserva&orientation=landscape",
  },
  {
    id: 4,
    kind: "kit",
    name: "Kit Visinho Pro",
    tagline: "Materiais prontos para atrair e converter novos vizinhos.",
    description:
      "Um kit completo de criativos, textos e roteiros para divulgar a vizinhança. É só adaptar com o seu link e usar nas redes. Feito para quem não quer perder tempo criando material do zero.",
    price: 150,
    oldPrice: 199,
    level: "Todos os níveis",
    includes: ["30 criativos prontos para redes", "Banco de textos de convite", "10 roteiros de vídeo curto"],
    image:
      "https://readdy.ai/api/search-image?query=A%20flat%20lay%20of%20a%20dark%20leather%20wallet%2C%20scattered%20golden%20coins%20and%20a%20small%20notebook%20on%20aged%20wood%2C%20warm%20amber%20light%2C%20deep%20teal%20shadows%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-kitpro&orientation=landscape",
  },
  {
    id: 5,
    kind: "mentoria",
    name: "Vizinhança VIP",
    tagline: "Acompanhamento próximo para montar uma rede sólida.",
    description:
      "Mentoria em grupo com encontros ao vivo e um canal direto para tirar dúvidas. Você traz o seu caso, a gente desenha o plano de indicação e acompanha a evolução mês a mês.",
    price: 200,
    level: "Intermediário",
    duration: "4 encontros ao vivo",
    includes: ["4 encontros ao vivo por mês", "Canal direto de dúvidas", "Plano de indicação personalizado"],
    image:
      "https://readdy.ai/api/search-image?query=A%20vintage%20brass%20key%20with%20a%20golden%20silk%20ribbon%20resting%20on%20dark%20velvet%2C%20warm%20amber%20light%2C%20deep%20dusk%20blue%20shadows%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-vip&orientation=landscape",
  },
  {
    id: 6,
    kind: "kit",
    name: "Ouro da Vizinhança",
    tagline: "Os baús de recompensa explicados e usados a seu favor.",
    description:
      "Kit que desvenda a tabela de baús por plano e mostra como a abertura de cada baú impacta o seu ganho. Inclui simulador de ganhos e guia de saque com taxa fixa de R$ 2,00.",
    price: 350,
    level: "Avançado",
    includes: ["Simulador de baús e ganhos", "Tabela completa por plano", "Guia de saque passo a passo"],
    image:
      "https://readdy.ai/api/search-image?query=Stacked%20golden%20coins%20glowing%20under%20warm%20amber%20light%20on%20a%20dark%20wooden%20surface%2C%20deep%20teal%20shadows%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-ouro&orientation=landscape",
  },
  {
    id: 7,
    kind: "curso",
    name: "Diamante Vizinho",
    tagline: "Do nível 1 ao nível 10 sem perder o controle da rede.",
    description:
      "Curso avançado sobre como manter os 10 níveis da rede saudáveis, evitar vizinhos inativos e organizar os seus pacotes para o ganho composto. Para quem já tem rede rodando.",
    price: 500,
    level: "Avançado",
    lessons: 24,
    duration: "7h de vídeo",
    includes: ["24 aulas em vídeo", "Painel de acompanhamento por nível", "Plano de reativação de vizinhos"],
    image:
      "https://readdy.ai/api/search-image?query=A%20faceted%20crystal%20prism%20scattering%20warm%20amber%20highlights%20on%20a%20dark%20surface%2C%20deep%20dusk%20blue%20shadows%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-diamante&orientation=landscape",
  },
  {
    id: 8,
    kind: "curso",
    name: "Lenda da Vizinhança",
    tagline: "O programa completo da comunidade, do primeiro convite ao topo.",
    description:
      "O nosso programa mais completo. Reúne tudo: como recrutar, como ativar os 10 níveis, como trabalhar os baús e como transformar a recorrência de 30 dias em renda estável. Refeito do zero com base no que mais funciona na vizinhança.",
    price: 1000,
    level: "Completo",
    lessons: 40,
    duration: "12h de vídeo",
    includes: [
      "40 aulas em vídeo",
      "Todos os kits e planilhas",
      "6 meses de suporte no grupo",
      "Sessão individual de 1 hora",
    ],
    image:
      "https://readdy.ai/api/search-image?query=An%20antique%20treasure%20chest%20slightly%20open%20with%20golden%20light%20pouring%20out%20onto%20dark%20wood%2C%20warm%20amber%20glow%2C%20deep%20teal%20shadows%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-lenda&orientation=landscape",
    featured: true,
  },
  {
    id: 9,
    kind: "template",
    name: "Caderno de Indicações",
    tagline: "Organize cada vizinho e cada baú num só lugar.",
    description:
      "Planilha pronta para registrar indicações, planos, baús abertos e saques. Chega com fórmulas já configuradas: você só preenche e ela soma os seus ganhos do mês.",
    price: 29,
    level: "Todos os níveis",
    includes: ["Planilha com fórmulas prontas", "Aba de baús e saques", "Vídeo de 10 min ensinando a usar"],
    image:
      "https://readdy.ai/api/search-image?query=An%20open%20notebook%20with%20golden%20ink%20handwritten%20marks%20on%20a%20dark%20desk%2C%20warm%20amber%20lantern%20light%2C%20deep%20dusk%20blue%20shadows%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-caderno&orientation=landscape",
  },
  {
    id: 10,
    kind: "curso",
    name: "Roteiro de Vídeos Curtos",
    tagline: "Grave convites que convertem usando só o celular.",
    description:
      "Curso curto e prático de gravação para redes sociais. Ensina enquadramento, iluminação simples e roteiros de 30 segundos que fazem o vizinho clicar no seu link.",
    price: 49,
    level: "Iniciante",
    lessons: 9,
    duration: "2h de vídeo",
    includes: ["9 aulas em vídeo", "20 roteiros de vídeo curto", "Checklist de gravação com celular"],
    image:
      "https://readdy.ai/api/search-image?query=A%20small%20ring%20light%20and%20a%20smartphone%20on%20a%20tripod%20in%20a%20dark%20room%2C%20warm%20amber%20glow%2C%20deep%20teal%20shadows%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-videos&orientation=landscape",
  },
  {
    id: 11,
    kind: "ebook",
    name: "Biblioteca de Copy",
    tagline: "Palavras certas para convidar sem parecer vendedor chato.",
    description:
      "Coletânea de textos prontos para WhatsApp, Instagram e TikTok. Cada texto vem com a variação certa para cada tipo de vizinho, do mais desconfiado ao que já quer entrar.",
    price: 39,
    level: "Todos os níveis",
    duration: "Leitura de 1h",
    includes: ["120 textos prontos de convite", "Variações por perfil de vizinho", "Guia de resposta a objeções"],
    image:
      "https://readdy.ai/api/search-image?query=A%20stack%20of%20aged%20books%20with%20golden%20embossed%20spines%20on%20dark%20wood%2C%20warm%20amber%20light%2C%20deep%20dusk%20blue%20shadows%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-copy&orientation=landscape",
  },
  {
    id: 12,
    kind: "template",
    name: "Planner 30 Dias",
    tagline: "Cada dia do ciclo com uma tarefa clara para cumprir.",
    description:
      "Planner de acompanhamento do ciclo de 30 dias. Define uma pequena missão por dia para manter a sua vizinhança ativa e chegar na renovação com a renda pronta para repetir.",
    price: 25,
    level: "Iniciante",
    includes: ["Planner de 30 dias pronto", "Missões diárias de indicação", "Rastreador de recorrência"],
    image:
      "https://readdy.ai/api/search-image?query=An%20open%20planner%20calendar%20with%20golden%20marks%20on%20a%20dark%20wooden%20desk%20beside%20a%20cup%20of%20coffee%2C%20warm%20amber%20light%2C%20deep%20teal%20shadows%2C%20cinematic%20moody%20still%20life%2C%20simple%20dark%20background%2C%20high%20detail%2C%20no%20text&width=800&height=600&seq=iv-prod-planner&orientation=landscape",
  },
];

export const catalogSteps = [
  {
    icon: "ri-download-cloud-line",
    title: "Acesso imediato",
    text: "Depois da confirmação, o curso ou o material cai direto na sua área do vizinho.",
  },
  {
    icon: "ri-play-circle-line",
    title: "Assista quando quiser",
    text: "As aulas em vídeo ficam disponíveis para assistir no seu ritmo, quantas vezes quiser.",
  },
  {
    icon: "ri-refresh-line",
    title: "Atualizações inclusas",
    text: "Sempre que um material é atualizado, você recebe a nova versão sem pagar de novo.",
  },
];