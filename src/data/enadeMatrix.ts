import { CourseData, CourseId } from '../types/enade';

export const ENADE_COURSES: Record<CourseId, CourseData> = {
  CC: {
    id: 'CC',
    name: 'Ciência da Computação',
    degree: 'Bacharelado',
    ordinance: 'Portaria nº 157/2026',
    description: 'Foco na fundamentação teórica, algoritmos, rigor metodológico e soluções computacionais eficientes e de alto impacto.',
    eixoX: [
      {
        id: 'cc-x1',
        code: 'X1',
        description: 'Crítico na identificação e criativo na resolução de problemas computacionais, contribuindo para o desenvolvimento de sua área e da sociedade.'
      },
      {
        id: 'cc-x2',
        code: 'X2',
        description: 'Atento à possibilidade de integração de diversas áreas de conhecimento.'
      },
      {
        id: 'cc-x3',
        code: 'X3',
        description: 'Racional na utilização dos recursos computacionais disponíveis, de acordo com o contexto, com foco na eficiência e eficácia.'
      },
      {
        id: 'cc-x4',
        code: 'X4',
        description: 'Ético e reflexivo em relação ao impacto da computação e suas tecnologias na sociedade e no ambiente.'
      },
      {
        id: 'cc-x5',
        code: 'X5',
        description: 'Rigoroso científica e metodologicamente, com raciocínio lógico e capacidade de abstração no desenvolvimento de soluções computacionais.'
      }
    ],
    eixoY: [
      {
        id: 'cc-y1',
        code: 'Y1',
        competency: 'Competência I',
        description: 'Conhecer fundamentos da computação'
      },
      {
        id: 'cc-y2',
        code: 'Y2',
        competency: 'Competência I',
        description: 'Conhecer métodos e ferramentas matemáticas e estatísticas'
      },
      {
        id: 'cc-y3',
        code: 'Y3',
        competency: 'Competência I',
        description: 'Analisar requisitos de sistemas e usabilidade'
      },
      {
        id: 'cc-y4',
        code: 'Y4',
        competency: 'Competência I',
        description: 'Avaliar aplicabilidade de métodos e ferramentas'
      },
      {
        id: 'cc-y5',
        code: 'Y5',
        competency: 'Competência I',
        description: 'Aplicar soluções computacionais a diversos domínios'
      },
      {
        id: 'cc-y6',
        code: 'Y6',
        competency: 'Competência II',
        description: 'Entender riscos na concepção e uso de sistemas'
      },
      {
        id: 'cc-y7',
        code: 'Y7',
        competency: 'Competência II',
        description: 'Aplicar conceitos, métodos e ferramentas de gestão de projetos'
      },
      {
        id: 'cc-y8',
        code: 'Y8',
        competency: 'Competência II',
        description: 'Aplicar temas e princípios recorrentes (abstração, caching, concorrência, etc.)'
      },
      {
        id: 'cc-y9',
        code: 'Y9',
        competency: 'Competência II',
        description: 'Analisar dados para tomada de decisão'
      },
      {
        id: 'cc-y10',
        code: 'Y10',
        competency: 'Competência II',
        description: 'Avaliar impactos na sociedade e ambiente'
      },
      {
        id: 'cc-y11',
        code: 'Y11',
        competency: 'Competência II',
        description: 'Integrar conhecimentos teóricos para problemas contemporâneos'
      }
    ],
    eixoZ: [
      { id: 'cc-z1', code: 'Z1', description: 'Algoritmos e estruturas de dados' },
      { id: 'cc-z2', code: 'Z2', description: 'Engenharia de software' },
      { id: 'cc-z3', code: 'Z3', description: 'Interação humano-computador' },
      { id: 'cc-z4', code: 'Z4', description: 'Ética, computação e sociedade' },
      { id: 'cc-z5', code: 'Z5', description: 'Sistemas digitais' },
      { id: 'cc-z6', code: 'Z6', description: 'Organização e arquitetura de computadores' },
      { id: 'cc-z7', code: 'Z7', description: 'Sistemas operacionais' },
      { id: 'cc-z8', code: 'Z8', description: 'Lógica e matemática discreta' },
      { id: 'cc-z9', code: 'Z9', description: 'Fundamentos e técnicas de programação' },
      { id: 'cc-z10', code: 'Z10', description: 'Paradigmas de linguagens de programação' },
      { id: 'cc-z11', code: 'Z11', description: 'Redes de computadores' },
      { id: 'cc-z12', code: 'Z12', description: 'Inteligência artificial' },
      { id: 'cc-z13', code: 'Z13', description: 'Bancos de dados' },
      { id: 'cc-z14', code: 'Z14', description: 'Computação gráfica e processamento de imagem' },
      { id: 'cc-z15', code: 'Z15', description: 'Teoria dos grafos' },
      { id: 'cc-z16', code: 'Z16', description: 'Probabilidade e estatística' },
      { id: 'cc-z17', code: 'Z17', description: 'Sistemas distribuídos' },
      { id: 'cc-z18', code: 'Z18', description: 'Teoria da computação' },
      { id: 'cc-z19', code: 'Z19', description: 'Compiladores' },
      { id: 'cc-z20', code: 'Z20', description: 'Segurança da informação' }
    ]
  },

  EC: {
    id: 'EC',
    name: 'Engenharia de Computação',
    degree: 'Bacharelado',
    ordinance: 'Portaria nº 161/2026',
    description: 'Integração hardware/software, sistemas embarcados, circuitos, automação e arquiteturas computacionais complexas.',
    eixoX: [
      {
        id: 'ec-x1',
        code: 'X1',
        description: 'Rigoroso científica e metodologicamente, com raciocínio lógico na integração hardware/software.'
      },
      {
        id: 'ec-x2',
        code: 'X2',
        description: 'Criativo e crítico na resolução de problemas sob aspectos políticos, econômicos, éticos, sociais e ambientais.'
      },
      {
        id: 'ec-x3',
        code: 'X3',
        description: 'Organizado, comunicativo, proativo, resiliente e colaborativo em contextos interdisciplinares.'
      },
      {
        id: 'ec-x4',
        code: 'X4',
        description: 'Comprometido com a atualização permanente e atento a tecnologias emergentes.'
      },
      {
        id: 'ec-x5',
        code: 'X5',
        description: 'Inovador e empreendedor na geração de novos produtos, processos e serviços.'
      }
    ],
    eixoY: [
      {
        id: 'ec-y1',
        code: 'Y1',
        competency: 'Competência I',
        description: 'Compreender dimensões quantitativas'
      },
      {
        id: 'ec-y2',
        code: 'Y2',
        competency: 'Competência I',
        description: 'Aplicar raciocínio lógico e matemática'
      },
      {
        id: 'ec-y3',
        code: 'Y3',
        competency: 'Competência I',
        description: 'Aplicar princípios de integração hardware/software'
      },
      {
        id: 'ec-y4',
        code: 'Y4',
        competency: 'Competência I',
        description: 'Analisar técnicas de otimização'
      },
      {
        id: 'ec-y5',
        code: 'Y5',
        competency: 'Competência I',
        description: 'Avaliar soluções inteligentes integradas'
      },
      {
        id: 'ec-y6',
        code: 'Y6',
        competency: 'Competência II',
        description: 'Compreender administração de infraestrutura'
      },
      {
        id: 'ec-y7',
        code: 'Y7',
        competency: 'Competência II',
        description: 'Aplicar boas práticas de especificação e validação'
      },
      {
        id: 'ec-y8',
        code: 'Y8',
        competency: 'Competência II',
        description: 'Aplicar controles e políticas de segurança'
      },
      {
        id: 'ec-y9',
        code: 'Y9',
        competency: 'Competência II',
        description: 'Analisar critérios técnicos de implantação'
      },
      {
        id: 'ec-y10',
        code: 'Y10',
        competency: 'Competência II',
        description: 'Avaliar viabilidade técnica, social e econômica'
      },
      {
        id: 'ec-y11',
        code: 'Y11',
        competency: 'Competência II',
        description: 'Conceber soluções inovadoras para problemas complexos'
      }
    ],
    eixoZ: [
      { id: 'ec-z1', code: 'Z1', description: 'Matemática e estatística' },
      { id: 'ec-z2', code: 'Z2', description: 'Física e ciência dos materiais' },
      { id: 'ec-z3', code: 'Z3', description: 'Matemática discreta e teoria dos grafos' },
      { id: 'ec-z4', code: 'Z4', description: 'Pesquisa operacional e otimização' },
      { id: 'ec-z5', code: 'Z5', description: 'Algoritmos e estruturas de dados' },
      { id: 'ec-z6', code: 'Z6', description: 'Linguagens formais e autômatos' },
      { id: 'ec-z7', code: 'Z7', description: 'Engenharia de software' },
      { id: 'ec-z8', code: 'Z8', description: 'IHC' },
      { id: 'ec-z9', code: 'Z9', description: 'Banco de dados' },
      { id: 'ec-z10', code: 'Z10', description: 'Circuitos elétricos e eletrônicos' },
      { id: 'ec-z11', code: 'Z11', description: 'Sistemas digitais e embarcados' },
      { id: 'ec-z12', code: 'Z12', description: 'Arquitetura de computadores' },
      { id: 'ec-z13', code: 'Z13', description: 'Sistemas operacionais' },
      { id: 'ec-z14', code: 'Z14', description: 'Ciência de dados' },
      { id: 'ec-z15', code: 'Z15', description: 'Processamento de sinais' },
      { id: 'ec-z16', code: 'Z16', description: 'Inteligência artificial' },
      { id: 'ec-z17', code: 'Z17', description: 'Automação e controle' },
      { id: 'ec-z18', code: 'Z18', description: 'Redes de computadores' },
      { id: 'ec-z19', code: 'Z19', description: 'Segurança de sistemas' },
      { id: 'ec-z20', code: 'Z20', description: 'Sistemas distribuídos e processamento paralelo' }
    ]
  },

  ADS: {
    id: 'ADS',
    name: 'Análise e Desenvolvimento de Sistemas',
    degree: 'Tecnologia',
    ordinance: 'Portaria nº 169/2026',
    description: 'Ciclo de vida de software, engenharia de requisitos, arquitetura de sistemas, bancos de dados e implementação ágil.',
    eixoX: [
      {
        id: 'ads-x1',
        code: 'X1',
        description: 'Criativo, proativo, crítico e sistêmico na resolução de problemas em ADS.'
      },
      {
        id: 'ads-x2',
        code: 'X2',
        description: 'Empreendedor e inovador na identificação de oportunidades de negócios.'
      },
      {
        id: 'ads-x3',
        code: 'X3',
        description: 'Ético e responsável perante questões sociais, humanísticas, ambientais, legais e tecnológicas.'
      },
      {
        id: 'ads-x4',
        code: 'X4',
        description: 'Comprometido com a formação continuada e atento ao impacto das TIC.'
      },
      {
        id: 'ads-x5',
        code: 'X5',
        description: 'Colaborativo e empático na atuação em equipes multidisciplinares.'
      }
    ],
    eixoY: [
      {
        id: 'ads-y1',
        code: 'Y1',
        competency: 'Competência I',
        description: 'Analisar tabelas, gráficos e diagramas'
      },
      {
        id: 'ads-y2',
        code: 'Y2',
        competency: 'Competência I',
        description: 'Compreender ciclo de vida de sistemas'
      },
      {
        id: 'ads-y3',
        code: 'Y3',
        competency: 'Competência I',
        description: 'Aplicar gestão de projetos e qualidade de software'
      },
      {
        id: 'ads-y4',
        code: 'Y4',
        competency: 'Competência I',
        description: 'Aplicar modelagem de negócios e requisitos'
      },
      {
        id: 'ads-y5',
        code: 'Y5',
        competency: 'Competência I',
        description: 'Empregar fundamentos computacionais em projetos'
      },
      {
        id: 'ads-y6',
        code: 'Y6',
        competency: 'Competência II',
        description: 'Aplicar práticas de qualidade e segurança de software'
      },
      {
        id: 'ads-y7',
        code: 'Y7',
        competency: 'Competência II',
        description: 'Implementar programas de computador'
      },
      {
        id: 'ads-y8',
        code: 'Y8',
        competency: 'Competência II',
        description: 'Utilizar técnicas de tratamento e gestão de dados'
      },
      {
        id: 'ads-y9',
        code: 'Y9',
        competency: 'Competência II',
        description: 'Avaliar algoritmos e estruturas de dados'
      },
      {
        id: 'ads-y10',
        code: 'Y10',
        competency: 'Competência II',
        description: 'Empregar arquitetura e programação em soluções'
      },
      {
        id: 'ads-y11',
        code: 'Y11',
        competency: 'Competência II',
        description: 'Propor soluções interdisciplinares em ADS'
      }
    ],
    eixoZ: [
      { id: 'ads-z1', code: 'Z1', description: 'Algoritmos e programação' },
      { id: 'ads-z2', code: 'Z2', description: 'Análise e arquitetura de sistemas' },
      { id: 'ads-z3', code: 'Z3', description: 'Banco de dados' },
      { id: 'ads-z4', code: 'Z4', description: 'Empreendedorismo' },
      { id: 'ads-z5', code: 'Z5', description: 'Engenharia de requisitos' },
      { id: 'ads-z6', code: 'Z6', description: 'Estruturas de dados' },
      { id: 'ads-z7', code: 'Z7', description: 'Gerência de configuração' },
      { id: 'ads-z8', code: 'Z8', description: 'Gerência de projetos' },
      { id: 'ads-z9', code: 'Z9', description: 'IHC' },
      { id: 'ads-z10', code: 'Z10', description: 'Legislação, ética e responsabilidade socioambiental' },
      { id: 'ads-z11', code: 'Z11', description: 'Lógica matemática' },
      { id: 'ads-z12', code: 'Z12', description: 'Operações e manutenção de software' },
      { id: 'ads-z13', code: 'Z13', description: 'Orientação a objetos' },
      { id: 'ads-z14', code: 'Z14', description: 'Arquitetura de computadores' },
      { id: 'ads-z15', code: 'Z15', description: 'Estatística e análise de dados' },
      { id: 'ads-z16', code: 'Z16', description: 'Redes e sistemas distribuídos' },
      { id: 'ads-z17', code: 'Z17', description: 'Segurança cibernética' },
      { id: 'ads-z18', code: 'Z18', description: 'Sistemas operacionais' },
      { id: 'ads-z19', code: 'Z19', description: 'Processo de software' },
      { id: 'ads-z20', code: 'Z20', description: 'Qualidade, verificação e validação de software' }
    ]
  },

  SI: {
    id: 'SI',
    name: 'Sistemas de Informação',
    degree: 'Bacharelado',
    ordinance: 'Portaria nº 168/2026',
    description: 'Alinhamento estratégico entre TI e negócios, governança, processos de negócio, arquitetura corporativa e gestão de dados.',
    eixoX: [
      {
        id: 'si-x1',
        code: 'X1',
        description: 'Sensível e crítico frente a questões sociais, profissionais, legais, éticas e ambientais.'
      },
      {
        id: 'si-x2',
        code: 'X2',
        description: 'Consciente sobre o papel e implicações dos sistemas de informação nas organizações.'
      },
      {
        id: 'si-x3',
        code: 'X3',
        description: 'Proativo e eficaz na solução de problemas organizacionais com visão sistêmica.'
      },
      {
        id: 'si-x4',
        code: 'X4',
        description: 'Criativo na proposição de soluções buscando múltiplas perspectivas.'
      },
      {
        id: 'si-x5',
        code: 'X5',
        description: 'Responsável e ético no uso de recursos financeiros, tecnológicos e humanos.'
      }
    ],
    eixoY: [
      {
        id: 'si-y1',
        code: 'Y1',
        competency: 'Competência I',
        description: 'Definir princípios da arquitetura de negócio'
      },
      {
        id: 'si-y2',
        code: 'Y2',
        competency: 'Competência I',
        description: 'Compreender princípios de programação'
      },
      {
        id: 'si-y3',
        code: 'Y3',
        competency: 'Competência I',
        description: 'Interpretar aspectos tecnológicos em contextos organizacionais'
      },
      {
        id: 'si-y4',
        code: 'Y4',
        competency: 'Competência I',
        description: 'Analisar desempenho e escalabilidade de soluções'
      },
      {
        id: 'si-y5',
        code: 'Y5',
        competency: 'Competência I',
        description: 'Avaliar qualidade de processos e produtos de TI'
      },
      {
        id: 'si-y6',
        code: 'Y6',
        competency: 'Competência II',
        description: 'Empregar modelos de gestão da informação'
      },
      {
        id: 'si-y7',
        code: 'Y7',
        competency: 'Competência II',
        description: 'Aplicar modelagens e soluções algorítmicas'
      },
      {
        id: 'si-y8',
        code: 'Y8',
        competency: 'Competência II',
        description: 'Analisar dados para tomada de decisão'
      },
      {
        id: 'si-y9',
        code: 'Y9',
        competency: 'Competência II',
        description: 'Analisar soluções para demandas de SI'
      },
      {
        id: 'si-y10',
        code: 'Y10',
        competency: 'Competência II',
        description: 'Avaliar gestão de bases de dados e conhecimento'
      },
      {
        id: 'si-y11',
        code: 'Y11',
        competency: 'Competência II',
        description: 'Integrar conhecimentos para problemas contemporâneos'
      }
    ],
    eixoZ: [
      { id: 'si-z1', code: 'Z1', description: 'Lógica e matemática discreta' },
      { id: 'si-z2', code: 'Z2', description: 'Probabilidade e estatística' },
      { id: 'si-z3', code: 'Z3', description: 'Algoritmos e estruturas de dados' },
      { id: 'si-z4', code: 'Z4', description: 'Paradigmas de programação' },
      { id: 'si-z5', code: 'Z5', description: 'Pesquisa operacional' },
      { id: 'si-z6', code: 'Z6', description: 'Fundamentos de SI e Teoria Geral de Sistemas' },
      { id: 'si-z7', code: 'Z7', description: 'Arquitetura corporativa e da informação' },
      { id: 'si-z8', code: 'Z8', description: 'Governança de TI' },
      { id: 'si-z9', code: 'Z9', description: 'Arquitetura de computadores' },
      { id: 'si-z10', code: 'Z10', description: 'Sistemas operacionais' },
      { id: 'si-z11', code: 'Z11', description: 'Redes e sistemas distribuídos' },
      { id: 'si-z12', code: 'Z12', description: 'Engenharia de software' },
      { id: 'si-z13', code: 'Z13', description: 'Concepção e modelagem de SI' },
      { id: 'si-z14', code: 'Z14', description: 'Gerenciamento de projetos' },
      { id: 'si-z15', code: 'Z15', description: 'Gestão de processos de negócio' },
      { id: 'si-z16', code: 'Z16', description: 'IHC' },
      { id: 'si-z17', code: 'Z17', description: 'Segurança da informação' },
      { id: 'si-z18', code: 'Z18', description: 'Banco de dados' },
      { id: 'si-z19', code: 'Z19', description: 'Visualização e ciência de dados' },
      { id: 'si-z20', code: 'Z20', description: 'Informática e sociedade' }
    ]
  },

  RC: {
    id: 'RC',
    name: 'Redes de Computadores',
    degree: 'Tecnologia',
    ordinance: 'Portaria nº 172/2026',
    description: 'Infraestrutura física e lógica, roteamento TCP/IP, segurança, virtualização, serviços de nuvem e tolerância a falhas.',
    eixoX: [
      {
        id: 'rc-x1',
        code: 'X1',
        description: 'Crítico e reflexivo na elaboração, implantação, gestão e segurança de redes.'
      },
      {
        id: 'rc-x2',
        code: 'X2',
        description: 'Empenhado na busca de conhecimentos técnicos e evolução tecnológica.'
      },
      {
        id: 'rc-x3',
        code: 'X3',
        description: 'Comprometido com a utilização eficiente e eficaz dos recursos.'
      },
      {
        id: 'rc-x4',
        code: 'X4',
        description: 'Propositivo, empreendedor e inovador em oportunidades de negócios.'
      },
      {
        id: 'rc-x5',
        code: 'X5',
        description: 'Ético e comprometido com normas, legislação, ambiente e governança.'
      }
    ],
    eixoY: [
      {
        id: 'rc-y1',
        code: 'Y1',
        competency: 'Competência I',
        description: 'Reconhecer elementos, topologias, protocolos e requisitos de redes'
      },
      {
        id: 'rc-y2',
        code: 'Y2',
        competency: 'Competência I',
        description: 'Explicar funcionamento e integração de LANs'
      },
      {
        id: 'rc-y3',
        code: 'Y3',
        competency: 'Competência I',
        description: 'Explicar funcionamento e integração de WANs'
      },
      {
        id: 'rc-y4',
        code: 'Y4',
        competency: 'Competência I',
        description: 'Implantar e configurar elementos lógicos/físicos, serviços e segurança'
      },
      {
        id: 'rc-y5',
        code: 'Y5',
        competency: 'Competência I',
        description: 'Administrar infraestruturas considerando disponibilidade, desempenho e tolerância a falhas'
      },
      {
        id: 'rc-y6',
        code: 'Y6',
        competency: 'Competência II',
        description: 'Estruturar projetos lógicos/físicos considerando interoperabilidade'
      },
      {
        id: 'rc-y7',
        code: 'Y7',
        competency: 'Competência II',
        description: 'Analisar soluções de segurança, gestão de riscos e conformidade'
      },
      {
        id: 'rc-y8',
        code: 'Y8',
        competency: 'Competência II',
        description: 'Empregar gestão de projetos e governança de TI'
      },
      {
        id: 'rc-y9',
        code: 'Y9',
        competency: 'Competência II',
        description: 'Avaliar estratégias com base em virtualização e automação'
      },
      {
        id: 'rc-y10',
        code: 'Y10',
        competency: 'Competência II',
        description: 'Avaliar tecnologias emergentes e impactos organizacionais'
      },
      {
        id: 'rc-y11',
        code: 'Y11',
        competency: 'Competência II',
        description: 'Integrar conhecimentos multidisciplinares em redes'
      }
    ],
    eixoZ: [
      { id: 'rc-z1', code: 'Z1', description: 'Fundamentos e topologias de redes' },
      { id: 'rc-z2', code: 'Z2', description: 'Transmissão de dados' },
      { id: 'rc-z3', code: 'Z3', description: 'Modelos de referência' },
      { id: 'rc-z4', code: 'Z4', description: 'Arquitetura TCP/IP' },
      { id: 'rc-z5', code: 'Z5', description: 'Algoritmos e protocolos de roteamento' },
      { id: 'rc-z6', code: 'Z6', description: 'Padrões IEEE 802.x' },
      { id: 'rc-z7', code: 'Z7', description: 'Redes sem fio' },
      { id: 'rc-z8', code: 'Z8', description: 'Cabeamento estruturado' },
      { id: 'rc-z9', code: 'Z9', description: 'Administração de SO' },
      { id: 'rc-z10', code: 'Z10', description: 'Serviços de redes' },
      { id: 'rc-z11', code: 'Z11', description: 'Virtualização' },
      { id: 'rc-z12', code: 'Z12', description: 'Programação e automação de redes' },
      { id: 'rc-z13', code: 'Z13', description: 'Segurança da informação' },
      { id: 'rc-z14', code: 'Z14', description: 'Projeto lógico e físico de redes' },
      { id: 'rc-z15', code: 'Z15', description: 'Configuração de dispositivos' },
      { id: 'rc-z16', code: 'Z16', description: 'Gerenciamento de redes' },
      { id: 'rc-z17', code: 'Z17', description: 'Tecnologias WAN' },
      { id: 'rc-z18', code: 'Z18', description: 'Tecnologias emergentes' },
      { id: 'rc-z19', code: 'Z19', description: 'Sustentabilidade e meio ambiente' },
      { id: 'rc-z20', code: 'Z20', description: 'Gestão de projetos e governança' }
    ]
  }
};
