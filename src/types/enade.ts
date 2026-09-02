export type CourseId = 'CC' | 'EC' | 'ADS' | 'SI' | 'RC';

export type QuestionType = 
  | 'objetiva_unica' 
  | 'objetiva_multipla' 
  | 'assercao_razao'
  | 'discursiva';

export type VisualResource = 
  | 'nenhum' 
  | 'tabela_markdown' 
  | 'diagrama_mermaid' 
  | 'descricao_figura'
  | 'imagem_ia_gratuita'
  | 'tabela_ia_gratuita'
  | 'imagem_nanobanana'
  | 'tabela_nanobanana';

export interface MatrixItem {
  id: string;
  code: string;
  description: string;
  competency?: 'Competência I' | 'Competência II';
}

export interface CourseData {
  id: CourseId;
  name: string;
  degree: string;
  ordinance: string; // Portaria / Matriz Curricular
  description: string;
  eixoX: MatrixItem[]; // Perfil do Concluinte (5 perfis)
  eixoY: MatrixItem[]; // Habilidades Y1..Y11 (Competência I e II)
  eixoZ: MatrixItem[]; // Objetos de Conhecimento Z1..Z20
}

export interface AuditCheckItem {
  criterion: string;
  status: 'passed' | 'warning' | 'corrected';
  description: string;
  ruleReference: string;
}

export interface AuditReport {
  score: number; // 0 to 100
  passedAll: boolean;
  checks: AuditCheckItem[];
  correctionsApplied?: string[];
  auditedAt: string;
}

export interface EnadeItemMetadata {
  curso: string;
  cursoId: CourseId;
  perfilX: string[];
  habilidadeY: string[];
  objetoZ: string[];
  tipoQuestao: string;
  recursoVisual: string;
  fonteContexto: string;
  referenciaABNT?: string;
}

export interface EnadeItem {
  id: string;
  createdAt: string;
  courseId: CourseId;
  courseName: string;
  ordinance: string;
  selectedX: string[]; // Descriptions or codes
  selectedY: string[];
  selectedZ: string[];
  questionType: QuestionType;
  visualResource: VisualResource;
  customContext?: string;
  attachmentName?: string;
  attachmentContent?: string;
  rawMarkdown: string; // The complete standard markdown ENADE format
  metadata: EnadeItemMetadata;
  textoBase: string;
  enunciado: string;
  visualContent?: string;
  opcoes?: {
    letter: string;
    text: string;
    isCorrect?: boolean;
  }[];
  afirmativas?: string[];
  discursivaRubric?: {
    criterio: string;
    descricao: string;
    pontuacao?: string;
  }[];
  gabarito: string;
  justificativa: string;
  tags: string[];
  auditReport?: AuditReport;
}
