import { EnadeItem, AuditReport } from '../types/enade';

const DEFAULT_SAMPLE_AUDIT: AuditReport = {
  score: 100,
  passedAll: true,
  auditedAt: '2026-09-01T12:00:00Z',
  checks: [
    { criterion: "Relevância do Texto-Base", status: "passed", description: "Texto-base contextualizado e indispensável à resolução.", ruleReference: "Guia PAI Seção 5.2.1" },
    { criterion: "Referência Bibliográfica ABNT", status: "passed", description: "Referência completa conforme normas ABNT.", ruleReference: "Guia PAI Seção 5.2.15" },
    { criterion: "Enunciado Direto e Afirmativo", status: "passed", description: "Comando afirmativo em ordem direta, sem 'exceto' ou 'incorreto'.", ruleReference: "Guia PAI Seções 5.1.6 e 5.2.10" },
    { criterion: "Ausência de Termos Excludentes", status: "passed", description: "Nenhum uso de 'apenas', 'somente', 'sempre', 'nunca' nas opções.", ruleReference: "Guia PAI Seção 5.2" },
    { criterion: "Distratores Plausíveis e Verossímeis", status: "passed", description: "Distratores refletem concepções errôneas reais sem 'não' isolado.", ruleReference: "Guia PAI Seção 5.2.3" },
    { criterion: "Paralelismo Sintático e Semântico", status: "passed", description: "Estrutura gramatical e extensão homogênea entre opções.", ruleReference: "Guia PAI Seção 5.2.8" },
    { criterion: "Disposição Lógica / Trapezoidal", status: "passed", description: "Opções ordenadas logicamente e balanceadas.", ruleReference: "Guia PAI Seções 5.2.4 e 5.2.5" },
    { criterion: "Balanceamento da Chave de Resposta", status: "passed", description: "Chave balanceada ou padrão estrito de Asserção-Razão/Única.", ruleReference: "Guia PAI Seções 4.1.2 e 4.1.3" },
    { criterion: "Justificativa Integral [CERTO/ERRADO]", status: "passed", description: "Justificativa pedagógica discriminada para todas as opções.", ruleReference: "Guia PAI Seção 5.2.6" },
    { criterion: "Tempo de Resposta (~4 min sem consulta)", status: "passed", description: "Adequado para resolução rápida em prova presencial.", ruleReference: "Guia PAI Seções 5.2.12 e 5.2.13" }
  ],
  correctionsApplied: [
    "Item auditado pelo Agente PAI Impacta com 100% de conformidade com o Guia de Elaboração 2024-2."
  ]
};

export const SAMPLE_QUESTIONS: EnadeItem[] = [
  {
    id: 'enade-si-004',
    createdAt: '2026-09-01T09:00:00Z',
    courseId: 'SI',
    courseName: 'Sistemas de Informação',
    ordinance: 'Portaria nº 161/2026',
    selectedX: ['Racional na utilização dos recursos computacionais com foco em governança.'],
    selectedY: ['Y3. Avaliar impacto de tecnologias em processos corporativos.'],
    selectedZ: ['Z4. Banco de dados e governança de dados', 'Z12. Computação em nuvem'],
    questionType: 'assercao_razao',
    visualResource: 'nenhum',
    rawMarkdown: `### METADADOS DA QUESTÃO
- **Curso:** Sistemas de Informação (Portaria nº 161/2026)
- **Perfil(is) do Concluinte (X):**
  1. Racional na utilização dos recursos computacionais com foco em governança.
- **Habilidade(s) Vinculada(s) (Y):**
  1. Y3. Avaliar impacto de tecnologias em processos corporativos.
- **Objeto(s) de Conhecimento (Z):**
  1. Z4. Banco de dados e governança de dados
  2. Z12. Computação em nuvem
- **Tipo de Questão:** Objetiva - Asserção-Razão
- **Recurso Visual:** Nenhum
- **Fonte do Contexto:** Elaborado pela IA
- **Referência ABNT:** LAUDON, K. C.; LAUDON, J. P. *Sistemas de Informação Gerenciais*. 14. ed. São Paulo: Pearson, 2023.

---

### [TEXTO-BASE]
Em uma organização do setor de saúde suplementar, a diretoria de tecnologia planeja a migração de seu repositório analítico de prontuários eletrônicos para um ambiente de nuvem pública multi-tenant. Para garantir conformidade com a Lei Geral de Proteção de Dados (LGPD) e mitigar riscos de vazamento de dados sensíveis (dados médicos), a equipe de segurança da informação propôs a implementação de criptografia de ponta a ponta com chaves gerenciadas pelo próprio cliente (Customer Managed Encryption Keys - CMEK) e mascaramento dinâmico de dados em tempo de consulta.

**Fonte / Referência Bibliográfica:**
LAUDON, K. C.; LAUDON, J. P. *Sistemas de Informação Gerenciais*. 14. ed. São Paulo: Pearson, 2023.

---

### [ENUNCIADO / COMANDO DA QUESTÃO]
Considerando a governança de dados e a segurança da informação na nuvem, analise as asserções a seguir e a relação proposta entre elas:

I. A adoção de chaves criptográficas gerenciadas pelo próprio cliente (CMEK) em bases de dados analíticas na nuvem confere soberania operacional e assegura que o provedor de nuvem não tenha acesso direto aos dados em repouso sem autorização explícita da organização.

PORQUE

II. O mascaramento dinâmico de dados altera permanentemente os registros físicos gravados em disco, inviabilizando que administradores de banco de dados recuperem os dados originais mesmo mediante credenciais privilegiadas.

A respeito dessas asserções, assinale a opção correta:

A) As asserções I e II são proposições verdadeiras, e a II é uma justificativa correta da I.
B) As asserções I e II são proposições verdadeiras, mas a II não é uma justificativa correta da I.
C) A asserção I é uma proposição verdadeira, e a II é uma proposição falsa.
D) A asserção I é uma proposição falsa, e a II é uma proposição verdadeira.
E) As asserções I e II são proposições falsas.

---

### [JUSTIFICATIVA PEDAGÓGICA E GABARITO]
- **Gabarito / Resposta Esperada:** C
- **Justificativa Detalhada:**
  - **Opção A [ERRADO]:** A asserção II é falsa, tornando a opção A incorreta.
  - **Opção B [ERRADO]:** A asserção II é tecnicamente inverídica.
  - **Opção C [CERTO]:** A asserção I é verdadeira (CMEK garante soberania sobre a chave-mestra e impede acesso indevido pelo provedor de cloud). A asserção II é falsa porque o mascaramento dinâmico (dynamic data masking) atua apenas na camada de apresentação/consulta em tempo de execução, preservando os dados brutos inalterados no armazenamento físico do banco.
  - **Opção D [ERRADO]:** A asserção I é verdadeira e a II é falsa.
  - **Opção E [ERRADO]:** A asserção I é verdadeira.`,
    metadata: {
      curso: 'Sistemas de Informação',
      cursoId: 'SI',
      perfilX: ['Racional na utilização dos recursos computacionais com foco em governança.'],
      habilidadeY: ['Y3. Avaliar impacto de tecnologias em processos corporativos.'],
      objetoZ: ['Z4. Banco de dados e governança de dados', 'Z12. Computação em nuvem'],
      tipoQuestao: 'Objetiva - Asserção-Razão',
      recursoVisual: 'Nenhum',
      fonteContexto: 'Elaborado pela IA',
      referenciaABNT: 'LAUDON, K. C.; LAUDON, J. P. Sistemas de Informação Gerenciais. São Paulo: Pearson, 2023.'
    },
    textoBase: 'Em uma organização do setor de saúde suplementar...',
    enunciado: 'Considerando a governança de dados e a segurança da informação na nuvem...',
    gabarito: 'C',
    justificativa: 'Asserção I é verdadeira e a II é falsa...',
    tags: ['Governança de Dados', 'Cloud', 'LGPD', 'Asserção-Razão', 'Z4', 'Z12'],
    auditReport: DEFAULT_SAMPLE_AUDIT
  },
  {
    id: 'enade-rc-001',
    createdAt: '2026-09-01T10:30:00Z',
    courseId: 'RC',
    courseName: 'Tecnologia em Redes de Computadores',
    ordinance: 'Portaria nº 172/2026',
    selectedX: ['Crítico e reflexivo na elaboração, implantação, gestão e segurança de redes.'],
    selectedY: ['Y5. Administrar e gerenciar recursos e infraestruturas considerando disponibilidade, desempenho e tolerância a falhas.'],
    selectedZ: [
      'Z11. Virtualização de redes, servidores, aplicativos e desktops',
      'Z16. Gerenciamento de redes de computadores'
    ],
    questionType: 'objetiva_unica',
    visualResource: 'tabela_markdown',
    customContext: 'Uma empresa de e-commerce está migrando sua infraestrutura física para um ambiente de alta disponibilidade baseado em máquinas virtuais.',
    rawMarkdown: `### METADADOS DA QUESTÃO
- **Curso:** Redes de Computadores (Portaria nº 172/2026)
- **Perfil(is) do Concluinte (X):**
  1. Crítico e reflexivo na elaboração, implantação, gestão e segurança de redes.
- **Habilidade(s) Vinculada(s) (Y):**
  1. Y5. Administrar infraestruturas considerando disponibilidade, desempenho e tolerância a falhas.
- **Objeto(s) de Conhecimento (Z):**
  1. Z11. Virtualização
  2. Z16. Gerenciamento de redes
- **Tipo de Questão:** Objetiva - Resposta Única
- **Recurso Visual:** Tabela Markdown
- **Fonte do Contexto:** Baseado no Texto-Base Informado
- **Referência ABNT:** KUROSE, J. F.; ROSS, K. W. *Redes de Computadores e a Internet: Uma Abordagem Top-Down*. 8. ed. São Paulo: Pearson, 2022.

---

### [TEXTO-BASE]
Uma empresa de comércio eletrônico de médio porte está modernizando sua infraestrutura computacional para suportar picos de tráfego durante datas comemorativas. A equipe técnica optou por substituir três servidores físicos dedicados por um cluster de virtualização com balanceamento de carga e armazenamento compartilhado via rede de armazenamento (SAN). 

Durante a fase de dimensionamento e análise de requisitos para garantir tolerância a falhas e alta disponibilidade (HA), foram consolidadas as seguintes métricas na tabela abaixo:

| Servidor / Função Virtualizada | Uso Médio de CPU | Memória RAM Alocada | Taxa de I/O em Disco (IOPS) | Política de Failover Requerida |
| :--- | :---: | :---: | :---: | :--- |
| **VM-Web (Frontend NGINX)** | 35% | 16 GB | 1.200 | Reinício Automático em Host Secundário |
| **VM-App (Microsserviços)** | 60% | 32 GB | 3.500 | Migração Ativa em Tempo Real (Live Migration) |
| **VM-DB (PostgreSQL Master)** | 75% | 64 GB | 8.000 | Réplica Síncrona + Heartbeat com Quorum |

**Fonte / Referência Bibliográfica:**
KUROSE, J. F.; ROSS, K. W. *Redes de Computadores e a Internet: Uma Abordagem Top-Down*. 8. ed. São Paulo: Pearson, 2022.

---

### [ENUNCIADO / COMANDO DA QUESTÃO]
Considerando os princípios de administração de infraestruturas virtualizadas com foco em alta disponibilidade e continuidade de negócios, assinale a opção que descreve a arquitetura técnica mais adequada para assegurar a menor perda de dados (RPO próximo de zero) e tempo de recuperação imediato (RTO mínimo) em caso de falha de hardware em um dos nós físicos do cluster.

---

### [OPÇÕES DE RESPOSTA OU ESTRUTURA DISCURSIVA]
A) Implementar cópias de segurança locais e horárias em disco rígido do mesmo nó físico, mantendo as instâncias em execução autônoma.
B) Implementar clusterização de hypervisors com armazenamento compartilhado em rede (iSCSI/NFS redundante), migração a quente (Live Migration) e quorum distribuído com failover automatizado para as máquinas virtuais críticas.
C) Desativar o mecanismo de heartbeat entre os hosts para diminuir o tráfego de broadcast e transferir os discos virtuais via FTP ao término de cada transação.
D) Alocar toda a memória RAM e vCPUs no nó primário, dispensando nós de redundância sob a premissa de que a camada de software absorve falhas físicas.
E) Executar a base de dados em contêiner efêmero sem persistência em volume externo para acelerar a inicialização caso ocorra reinicialização do nó.

---

### [JUSTIFICATIVA PEDAGÓGICA E GABARITO]
- **Gabarito / Resposta Esperada:** B
- **Justificativa Detalhada:** 
  - **Opção A [ERRADO]:** Snapshots em disco local perecem em caso de falha física do host e não proporcionam recuperação automática em tempo real.
  - **Opção B [CERTO]:** Atende à Habilidade Y5 e aos Objetos Z11 e Z16. A infraestrutura de cluster com storage compartilhado redundante e controle de quorum viabiliza failover automático e Live Migration sem interrupção.
  - **Opção C [ERRADO]:** O heartbeat é indispensável para a detecção de split-brain e integridade do cluster. FTP é inadequado para tráfego transacional de VMs.
  - **Opção D [ERRADO]:** A virtualização não anula a possibilidade de falha em hardware físico subjacente (placa-mãe, memória, fonte).
  - **Opção E [ERRADO]:** Contêineres efêmeros sem volumes persistentes implicam perda total de dados transacionais bancários em crash.`,
    metadata: {
      curso: 'Redes de Computadores',
      cursoId: 'RC',
      perfilX: ['Crítico e reflexivo na elaboração, implantação, gestão e segurança de redes.'],
      habilidadeY: ['Y5. Administrar infraestruturas considerando disponibilidade, desempenho e tolerância a falhas.'],
      objetoZ: ['Z11. Virtualização', 'Z16. Gerenciamento de redes'],
      tipoQuestao: 'Objetiva - Resposta Única',
      recursoVisual: 'Tabela Markdown',
      fonteContexto: 'Baseado no Texto-Base Informado',
      referenciaABNT: 'KUROSE, J. F.; ROSS, K. W. Redes de Computadores e a Internet: Uma Abordagem Top-Down. São Paulo: Pearson, 2022.'
    },
    textoBase: 'Uma empresa de comércio eletrônico está modernizando sua infraestrutura...',
    enunciado: 'Considerando os princípios de administração de infraestruturas virtualizadas com foco em alta disponibilidade...',
    gabarito: 'B',
    justificativa: 'A alternativa B integra corretamente o cluster com storage redundante...',
    tags: ['Virtualização', 'Alta Disponibilidade', 'Failover', 'Z11', 'Y5'],
    auditReport: DEFAULT_SAMPLE_AUDIT
  },
  {
    id: 'enade-cc-002',
    createdAt: '2026-09-01T11:15:00Z',
    courseId: 'CC',
    courseName: 'Ciência da Computação',
    ordinance: 'Portaria nº 157/2026',
    selectedX: [
      'Rigoroso científica e metodologicamente, com raciocínio lógico e capacidade de abstração no desenvolvimento de soluções computacionais.'
    ],
    selectedY: [
      'Y1. Conhecer fundamentos da computação',
      'Y8. Aplicar temas e princípios recorrentes (abstração, caching, concorrência, etc.)'
    ],
    selectedZ: [
      'Z1. Algoritmos e estruturas de dados',
      'Z18. Teoria da computação'
    ],
    questionType: 'objetiva_multipla',
    visualResource: 'diagrama_mermaid',
    rawMarkdown: `### METADADOS DA QUESTÃO
- **Curso:** Ciência da Computação (Portaria nº 157/2026)
- **Perfil(is) do Concluinte (X):**
  1. Rigoroso científica e metodologicamente, com raciocínio lógico e capacidade de abstração no desenvolvimento de soluções computacionais.
- **Habilidade(s) Vinculada(s) (Y):**
  1. Y1. Conhecer fundamentos da computação
  2. Y8. Aplicar temas e princípios recorrentes (abstração, caching, concorrência, etc.)
- **Objeto(s) de Conhecimento (Z):**
  1. Z1. Algoritmos e estruturas de dados
  2. Z18. Teoria da computação
- **Tipo de Questão:** Objetiva - Resposta Múltipla / Afirmativas Combinadas
- **Recurso Visual:** Diagrama Mermaid
- **Fonte do Contexto:** Elaborado pela IA
- **Referência ABNT:** CORMEN, T. H. et al. *Algoritmos: Teoria e Prática*. 4. ed. Rio de Janeiro: GEN LTC, 2024.

---

### [TEXTO-BASE]
Na análise assintótica de algoritmos de ordenação e estruturas de dados em memória secundária, a hierarquia de memória impõe custos de latência substancialmente distintos entre acessos a cache L1/L2/L3 e operações de I/O em disco.

O diagrama a seguir ilustra a complexidade assintótica no pior e no caso médio de algoritmos canônicos:

\`\`\`mermaid
graph TD
    A[Algoritmos de Ordenação] --> B[Baseados em Comparação]
    A --> C[Distribuição / Contagem]
    B --> D["MergeSort: O(N log N) pior caso"]
    B --> E["QuickSort: O(N^2) pior caso, O(N log N) médio"]
    B --> F["HeapSort: O(N log N) in-place"]
    C --> G["Counting / Radix Sort: O(N + K)"]
\`\`\`

Considere a teoria de limitantes inferiores (Lower Bound) para ordenação por comparação, a qual estabelece que qualquer árvore de decisão para ordenar $n$ elementos distintos possui pelo menos $n!$ folhas, implicando altura mínima $\\Omega(n \\log n)$.

**Fonte / Referência Bibliográfica:**
CORMEN, T. H. et al. *Algoritmos: Teoria e Prática*. 4. ed. Rio de Janeiro: GEN LTC, 2024.

---

### [ENUNCIADO / COMANDO DA QUESTÃO]
Com base na análise de complexidade temporal e espacial, avalie as afirmativas a seguir:

I. Todo algoritmo de ordenação estritamente baseado em comparações entre pares de elementos necessita de no mínimo $\\Omega(n \\log n)$ comparações no pior caso para ordenar uma sequência arbitrária de $n$ chaves distintas.
II. O algoritmo *QuickSort*, quando implementado com partição de Lomuto e escolha determinística do primeiro elemento como pivô, apresenta complexidade temporal $O(n \\log n)$ no pior caso quando a lista de entrada já se encontra perfeitamente ordenada.
III. Algoritmos como *Counting Sort* e *Radix Sort* conseguem superar o limite assintótico $\\Omega(n \\log n)$ porque não realizam ordenação exclusivamente por meio de comparações binárias de chaves, fazendo uso das propriedades da representação posicional dos valores.

É correto o que se afirma em:
A) I e II.
B) II e III.
C) I e III.
D) I, II e III.
E) III.

---

### [JUSTIFICATIVA PEDAGÓGICA E GABARITO]
- **Gabarito / Resposta Esperada:** C
- **Justificativa Detalhada:**
  - **Afirmativa I [CERTO]:** Pelo teorema do limitante inferior via modelo de árvore de decisão binária, a altura da árvore $h \\ge \\log_2(n!) = \\Theta(n \\log n)$, logo qualquer algoritmo baseado em comparações exige no mínimo $\\Omega(n \\log n)$ passos no pior caso.
  - **Afirmativa II [ERRADO]:** No QuickSort com pivô fixo no primeiro elemento, uma lista já ordenada gera partições degeneradas com subvetores de tamanho $0$ e $n-1$, resultando em recorrência $T(n) = T(n-1) + \\Theta(n)$, cuja solução é $O(n^2)$ no pior caso.
  - **Afirmativa III [CERTO]:** Counting Sort e Radix Sort utilizam aritmética de índices e contagem direta sobre o alfabeto das chaves, não dependendo de comparações diretas entre pares, operando em tempo $O(n + k)$ ou $O(d \\cdot (n + k))$.`,
    metadata: {
      curso: 'Ciência da Computação',
      cursoId: 'CC',
      perfilX: ['Rigoroso científica e metodologicamente...'],
      habilidadeY: ['Y1. Conhecer fundamentos da computação', 'Y8. Princípios recorrentes'],
      objetoZ: ['Z1. Algoritmos e estruturas de dados', 'Z18. Teoria da computação'],
      tipoQuestao: 'Objetiva - Resposta Múltipla',
      recursoVisual: 'Diagrama Mermaid',
      fonteContexto: 'Elaborado pela IA',
      referenciaABNT: 'CORMEN, T. H. et al. Algoritmos: Teoria e Prática. Rio de Janeiro: GEN LTC, 2024.'
    },
    textoBase: 'Na análise assintótica de algoritmos de ordenação...',
    enunciado: 'Com base na análise de complexidade temporal e espacial, avalie as afirmativas...',
    gabarito: 'C',
    justificativa: 'Afirmativas I e III estão corretas. A afirmativa II é falsa porque o pior caso do QuickSort clássico em listas ordenadas é O(N^2).',
    tags: ['Algoritmos', 'Complexidade', 'Teoria da Computação', 'Z1', 'Z18', 'Y1'],
    auditReport: DEFAULT_SAMPLE_AUDIT
  },
  {
    id: 'enade-ads-003',
    createdAt: '2026-09-01T12:00:00Z',
    courseId: 'ADS',
    courseName: 'Análise e Desenvolvimento de Sistemas',
    ordinance: 'Portaria nº 169/2026',
    selectedX: [
      'Criativo, proativo, crítico e sistêmico na resolução de problemas em ADS.'
    ],
    selectedY: [
      'Y4. Aplicar modelagem de negócios e requisitos',
      'Y6. Aplicar práticas de qualidade e segurança de software'
    ],
    selectedZ: [
      'Z2. Análise e arquitetura de sistemas',
      'Z17. Segurança cibernética'
    ],
    questionType: 'discursiva',
    visualResource: 'nenhum',
    rawMarkdown: `### METADADOS DA QUESTÃO
- **Curso:** Análise e Desenvolvimento de Sistemas (Portaria nº 169/2026)
- **Perfil(is) do Concluinte (X):**
  1. Criativo, proativo, crítico e sistêmico na resolução de problemas em ADS.
- **Habilidade(s) Vinculada(s) (Y):**
  1. Y4. Aplicar modelagem de negócios e requisitos
  2. Y6. Aplicar práticas de qualidade e segurança de software
- **Objeto(s) de Conhecimento (Z):**
  1. Z2. Análise e arquitetura de sistemas
  2. Z17. Segurança cibernética
- **Tipo de Questão:** Discursiva / Dissertativa
- **Recurso Visual:** Nenhum
- **Fonte do Contexto:** Elaborado pela IA
- **Referência ABNT:** PRESSMAN, R. S.; MAXIM, B. R. *Engenharia de Software: Uma Abordagem Profissional*. 9. ed. Porto Alegre: AMGH, 2021.

---

### [TEXTO-BASE]
Uma instituição financeira digital está reestruturando sua plataforma de pagamentos instantâneos (PIX e transferências bancárias). A arquitetura legada consiste em uma aplicação monolítica com banco de dados centralizado relacional, sujeita a gargalos em horários de pico e suscetível a vulnerabilidades de autenticação por tokens em sessão de longa duração sem renovação dinâmica.

A gerência de engenharia de software definiu os seguintes requisitos não funcionais prioritários:
1. **Desacoplamento e Escalabilidade Horizontal:** Processamento assíncrono de notificações de pagamento sem bloqueio da API síncrona do cliente.
2. **Segurança e Zero Trust:** Autenticação stateless baseada em OAuth 2.0 / OpenID Connect com mTLS e controle estrito de RBAC (Role-Based Access Control).
3. **Resiliência:** Tolerância a indisponibilidades temporárias de provedores externos via padrões de mensageria e Circuit Breaker.

**Fonte / Referência Bibliográfica:**
PRESSMAN, R. S.; MAXIM, B. R. *Engenharia de Software: Uma Abordagem Profissional*. 9. ed. Porto Alegre: AMGH, 2021.

---

### [ENUNCIADO / COMANDO DA QUESTÃO]
Considerando o cenário exposto, elabore um parecer dissertativo-técnico estruturado contendo:

a) A proposição de um padrão arquitetural distribuído adequado (ex.: Microsserviços orientados a eventos com Message Broker), justificando de que modo ele atende aos requisitos de desacoplamento e resiliência. *(Valor: 4,0 pontos)*
b) A especificação de duas práticas essenciais de segurança cibernética a serem implementadas na camada de API Gateway para prevenir ataques de injeção e sequestro de sessão (Session Hijacking). *(Valor: 3,0 pontos)*
c) A descrição do mecanismo de *Circuit Breaker* e sua importância para evitar falhas em cascata em integrações financeiras com serviços externos. *(Valor: 3,0 pontos)*

---

### [PADRÃO DE RESPOSTA (GRADE DE CORREÇÃO)]
- **Critério 1 (Avaliação de Y4 / Z2 - Arquitetura de Software e Mensageria):**
  - O estudante deve propor arquitetura de microsserviços orientada a eventos (Event-Driven Architecture) utilizando filas/mensageria (Kafka, RabbitMQ ou AWS SQS) para processar pagamentos de forma assíncrona, garantindo que o cliente receba confirmação de recebimento rápida enquanto o processamento transacional pesado ocorre desacoplado. (Pontuação: até 4,0 pontos).
- **Critério 2 (Avaliação de Y6 / Z17 - Segurança de Software e APIs):**
  - O estudante deve indicar e justificar práticas como: uso de tokens JWT de curta duração com Refresh Tokens armazenados com rotação estrita; rate limiting e validação estrita de schema de entrada contra injeções SQL/NoSQL no API Gateway; uso de mTLS entre microsserviços. (Pontuação: até 3,0 pontos).
- **Critério 3 (Avaliação de Y6 / Z2 - Resiliência e Circuit Breaker):**
  - O estudante deve conceituar os estados do Circuit Breaker (Fechado, Aberto e Meio-Aberto), demonstrando que quando um serviço terceiro apresenta taxa alta de erros ou timeout, o circuito abre para interromper chamadas infrutíferas e proteger recursos do sistema contra esgotamento de threads. (Pontuação: até 3,0 pontos).

---

### [JUSTIFICATIVA PEDAGÓGICA E GABARITO]
- **Gabarito / Resposta Esperada:** Espera-se que o concluinte demonstre capacidade sistêmica de desenho de software corporativo seguro, articulando arquitetura de eventos, padrões de segurança em APIs e táticas de resiliência indispensáveis ao setor financeiro moderno.`,
    metadata: {
      curso: 'Análise e Desenvolvimento de Sistemas',
      cursoId: 'ADS',
      perfilX: ['Criativo, proativo, crítico e sistêmico...'],
      habilidadeY: ['Y4. Modelagem de requisitos', 'Y6. Qualidade e segurança'],
      objetoZ: ['Z2. Análise e arquitetura', 'Z17. Segurança cibernética'],
      tipoQuestao: 'Discursiva',
      recursoVisual: 'Nenhum',
      fonteContexto: 'Elaborado pela IA',
      referenciaABNT: 'PRESSMAN, R. S.; MAXIM, B. R. Engenharia de Software: Uma Abordagem Profissional. Porto Alegre: AMGH, 2021.'
    },
    textoBase: 'Uma instituição financeira digital está reestruturando sua plataforma...',
    enunciado: 'Considerando o cenário exposto, elabore um texto dissertativo-técnico estruturado...',
    gabarito: 'Padrão de resposta com 3 critérios pontuados totalizando 10 pontos.',
    justificativa: 'Item discursivo alinhado às competências de arquitetura e segurança de software.',
    tags: ['Microsserviços', 'Segurança', 'Circuit Breaker', 'Z2', 'Z17', 'Discursiva'],
    auditReport: DEFAULT_SAMPLE_AUDIT
  }
];
