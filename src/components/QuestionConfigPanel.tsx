import React, { useRef } from 'react';
import { 
  FileText, 
  Table2, 
  GitFork, 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Sparkles, 
  Layers, 
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { QuestionType, VisualResource } from '../types/enade';

interface QuestionConfigPanelProps {
  questionType: QuestionType;
  setQuestionType: (type: QuestionType) => void;
  visualResource: VisualResource;
  setVisualResource: (res: VisualResource) => void;
  customContext: string;
  setCustomContext: (val: string) => void;
  attachmentName: string | null;
  attachmentContent: string | null;
  onFileUpload: (file: File) => void;
  onRemoveAttachment: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  isValidToGenerate: boolean;
  validationErrors: string[];
}

export const QuestionConfigPanel: React.FC<QuestionConfigPanelProps> = ({
  questionType,
  setQuestionType,
  visualResource,
  setVisualResource,
  customContext,
  setCustomContext,
  attachmentName,
  attachmentContent,
  onFileUpload,
  onRemoveAttachment,
  onGenerate,
  isGenerating,
  isValidToGenerate,
  validationErrors
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">2</span>
            <span>Estrutura do Item & Recursos Personalizados</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Defina o formato de resposta, inclusão de tabelas ou diagramas e documentos contextuais.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tipo de Questão */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Formato / Tipo de Questão ENADE
          </label>
          <div className="space-y-2">
            {[
              {
                id: 'objetiva_unica' as QuestionType,
                title: 'Objetiva - Resposta Única',
                desc: 'Enunciado contextualizado com 5 alternativas (A..E), 1 gabarito e 4 distratores plausíveis.'
              },
              {
                id: 'objetiva_multipla' as QuestionType,
                title: 'Objetiva - Resposta Múltipla (Afirmativas I, II, III)',
                desc: 'Análise de 3 a 5 afirmações independentes com chave de respostas balanceada e homogênea.'
              },
              {
                id: 'assercao_razao' as QuestionType,
                title: 'Objetiva - Asserção-Razão (PORQUE)',
                desc: 'Duas proposições unidas por PORQUE e chave canônica de avaliação de veracidade e causalidade.'
              },
              {
                id: 'discursiva' as QuestionType,
                title: 'Discursiva / Dissertativa',
                desc: 'Situação-problema aberta com Padrão de Resposta e Grade de Correção pontuada por critério.'
              }
            ].map((t) => {
              const isSelected = questionType === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setQuestionType(t.id)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/15'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{t.title}</span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recurso Visual */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Inclusão de Recurso Visual Obrigatório
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                id: 'nenhum' as VisualResource,
                icon: FileText,
                title: 'Nenhum',
                desc: 'Texto contínuo puro',
                badge: null
              },
              {
                id: 'tabela_markdown' as VisualResource,
                icon: Table2,
                title: 'Tabela Markdown',
                desc: 'Matriz com dados comparativos',
                badge: null
              },
              {
                id: 'diagrama_mermaid' as VisualResource,
                icon: GitFork,
                title: 'Diagrama Mermaid',
                desc: 'Fluxograma ou arquitetura',
                badge: null
              },
              {
                id: 'descricao_figura' as VisualResource,
                icon: ImageIcon,
                title: 'Descrição de Figura',
                desc: 'Esquema gráfico textual',
                badge: null
              },
              {
                id: 'imagem_ia_gratuita' as VisualResource,
                icon: Sparkles,
                title: 'Imagem com IA Gratuita',
                desc: 'Diagrama ou esquema técnico gerado por IA (.jpg)',
                badge: 'IA Gratuita'
              },
              {
                id: 'tabela_ia_gratuita' as VisualResource,
                icon: Table2,
                title: 'Tabela com IA Gratuita',
                desc: 'Tabela gráfica comparativa gerada por IA (.jpg)',
                badge: 'IA Gratuita'
              }
            ].map((r) => {
              const Icon = r.icon;
              const isSelected = visualResource === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setVisualResource(r.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between relative ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/15'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : r.badge ? 'text-amber-500' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold text-slate-900">{r.title}</span>
                    </div>
                    {r.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300/80 shrink-0 flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                        {r.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contexto Personalizado e Upload de Anexos */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Texto-base personalizado */}
        <div className="space-y-1.5 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">
              Texto-Base Personalizado do Elaborador (Opcional)
            </label>
            <span className="text-[10px] text-slate-400 font-mono">
              {customContext.length} carac.
            </span>
          </div>
          <textarea
            value={customContext}
            onChange={(e) => setCustomContext(e.target.value)}
            placeholder="Exemplo: Uma empresa de telecomunicações identificou alta latência em links MPLS e deseja avaliar migração para SD-WAN com políticas dinâmicas de QoS..."
            rows={4}
            className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-slate-800"
          />
          <p className="text-[10px] text-slate-400">
            Se informado, a IA utilizará obrigatoriamente esta situação-problema como contexto nuclear.
          </p>
        </div>

        {/* Arquivo de Consulta / Anexo */}
        <div className="space-y-1.5 flex flex-col">
          <label className="text-xs font-bold text-slate-700">
            Arquivo de Consulta Técnico (PDF, TXT, Código, CSV) (Opcional)
          </label>

          {!attachmentName ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/60 rounded-xl p-4 text-center cursor-pointer transition-all flex-1 flex flex-col items-center justify-center"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.pdf,.csv,.json,.ts,.js,.py,.java,.c,.cpp,.sql"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && onFileUpload(e.target.files[0])}
              />
              <Upload className="w-5 h-5 text-blue-600 mb-1.5" />
              <p className="text-xs font-semibold text-slate-700">
                Clique para anexar arquivo de referência
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Trechos de artigos, normas ISO/IEEE, scripts ou dados para embasamento
              </p>
            </div>
          ) : (
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl flex-1 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-blue-900 block truncate max-w-[200px]">
                      {attachmentName}
                    </span>
                    <span className="text-[10px] text-blue-700">
                      Anexo carregado e pronto para o prompt
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onRemoveAttachment}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                  title="Remover anexo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {attachmentContent && (
                <div className="mt-2 bg-white p-2 rounded-lg border border-blue-100 text-[10px] font-mono text-slate-600 line-clamp-2">
                  {attachmentContent.slice(0, 150)}...
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Agente de Boas Práticas Notification */}
      <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-950">Agente Revisor & Corretor PAI Ativo</span>
              <span className="text-[10px] bg-indigo-200/80 text-indigo-800 font-bold px-1.5 py-0.5 rounded">Impacta 2024-2</span>
            </div>
            <p className="text-[11px] text-indigo-800/80 mt-0.5">
              Audita e corrige automaticamente: Referência ABNT, Paralelismo Sintático, Proibição de Termos Excludentes e Distratores Plausíveis.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shrink-0">
          10/10 Diretrizes Auditadas
        </span>
      </div>

      {/* Validation alert & Generate Button */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        {validationErrors.length > 0 ? (
          <div className="flex items-center gap-2 text-rose-700 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{validationErrors[0]}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Matriz 3D perfeitamente configurada conforme diretrizes da Faculdade Impacta</span>
          </div>
        )}

        <button
          id="generate-enade-item-btn"
          type="button"
          disabled={!isValidToGenerate || isGenerating}
          onClick={onGenerate}
          className="w-full sm:w-auto px-6 py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 flex items-center justify-center gap-2.5 transition-all"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Gerando Item ENADE com IA...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Gerar Questão no Padrão ENADE</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
