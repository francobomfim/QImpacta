import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import confetti from 'canvas-confetti';
import { 
  Bookmark, 
  Copy, 
  Check, 
  FileDown, 
  FileText, 
  Printer, 
  Edit3, 
  Eye, 
  Sparkles,
  Share2,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Award,
  BookOpen,
  Image as ImageIcon,
  Table2,
  X
} from 'lucide-react';
import { EnadeItem, AuditReport } from '../types/enade';
import { 
  exportItemAsJSON, 
  exportItemAsMarkdown, 
  exportItemAsLaTeX, 
  exportItemAsDOCX, 
  printOfficialEnadeSheet 
} from '../utils/exportUtils';

interface GeneratedItemViewerProps {
  item: EnadeItem;
  onSaveToBank: (item: EnadeItem) => void;
  isSavedInBank: boolean;
  onUpdateItemContent?: (newMarkdown: string, auditReport?: AuditReport) => void;
}

export const GeneratedItemViewer: React.FC<GeneratedItemViewerProps> = ({
  item,
  onSaveToBank,
  isSavedInBank,
  onUpdateItemContent
}) => {
  const [activeView, setActiveView] = useState<'preview' | 'raw' | 'edit'>('preview');
  const [editedMarkdown, setEditedMarkdown] = useState(item.rawMarkdown);
  const [copied, setCopied] = useState(false);
  const [showAuditDetails, setShowAuditDetails] = useState(true);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditFeedback, setAuditFeedback] = useState<string | null>(null);

  // Free AI Visual Studio Modal State
  const [isFreeAiModalOpen, setIsFreeAiModalOpen] = useState(false);
  const [freeAiType, setFreeAiType] = useState<'imagem' | 'tabela'>(
    item.visualResource === 'tabela_ia_gratuita' || item.visualResource === 'tabela_nanobanana' ? 'tabela' : 'imagem'
  );
  const [freeAiCustomPrompt, setFreeAiCustomPrompt] = useState('');
  const [isGeneratingVisual, setIsGeneratingVisual] = useState(false);
  const [freeAiGeneratedVisual, setFreeAiGeneratedVisual] = useState<{
    imageUrl: string;
    caption: string;
  } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.rawMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveToBank(item);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {
      // ignore
    }
  };

  const handleApplyEdit = () => {
    if (onUpdateItemContent) {
      onUpdateItemContent(editedMarkdown, item.auditReport);
    }
    item.rawMarkdown = editedMarkdown;
    setActiveView('preview');
  };

  const handleRunAuditor = async () => {
    setIsAuditing(true);
    setAuditFeedback(null);
    try {
      const response = await fetch('/api/audit-and-correct-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: item.rawMarkdown })
      });

      if (!response.ok) {
        throw new Error('Falha na comunicação com o Agente Auditor');
      }

      const data = await response.json();
      if (data.markdown) {
        item.rawMarkdown = data.markdown;
        item.auditReport = data.auditReport;
        setEditedMarkdown(data.markdown);
        if (onUpdateItemContent) {
          onUpdateItemContent(data.markdown, data.auditReport);
        }
        setAuditFeedback('Questão auditada e corrigida com sucesso pelo Agente PAI Impacta!');
        setTimeout(() => setAuditFeedback(null), 4000);
      }
    } catch (err: any) {
      console.error('Audit failed:', err);
      setAuditFeedback('Erro ao processar auditoria. Tente novamente.');
      setTimeout(() => setAuditFeedback(null), 4000);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleGenerateFreeAiVisual = async () => {
    setIsGeneratingVisual(true);
    try {
      const topic = item.selectedZ?.join(', ') || item.courseName;
      const response = await fetch('/api/generate-free-ai-visual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: freeAiType,
          topic,
          context: item.textoBase || item.rawMarkdown.slice(0, 350),
          courseName: item.courseName,
          customPrompt: freeAiCustomPrompt.trim() || undefined
        })
      });

      if (!response.ok) throw new Error('Falha ao gerar recurso visual com IA Gratuita');
      const data = await response.json();
      if (data.imageUrl) {
        setFreeAiGeneratedVisual({
          imageUrl: data.imageUrl,
          caption: data.caption
        });
      }
    } catch (err) {
      console.error('Error generating Free AI visual:', err);
    } finally {
      setIsGeneratingVisual(false);
    }
  };

  const handleInsertFreeAiVisual = () => {
    if (!freeAiGeneratedVisual) return;
    const caption = freeAiGeneratedVisual.caption;
    const visualMarkdown = `\n\n![${caption}](${freeAiGeneratedVisual.imageUrl})\n\n*${caption}*\n\n`;

    let updated = item.rawMarkdown;
    if (updated.includes('### [TEXTO-BASE]')) {
      updated = updated.replace(
        /### \[TEXTO-BASE\]([\s\S]*?)(?=\n\n\*\*Fonte|\n---|\n### \[ENUNCIADO)/,
        (match, p1) => `### [TEXTO-BASE]${p1}${visualMarkdown}`
      );
    } else {
      updated = `${visualMarkdown}\n${updated}`;
    }

    item.rawMarkdown = updated;
    setEditedMarkdown(updated);
    if (onUpdateItemContent) {
      onUpdateItemContent(updated, item.auditReport);
    }
    setIsFreeAiModalOpen(false);
    setFreeAiGeneratedVisual(null);
  };

  const audit = item.auditReport;
  const hasVisualResource = 
    item.rawMarkdown.includes('IA Gratuita') || 
    item.visualResource === 'imagem_ia_gratuita' || 
    item.visualResource === 'tabela_ia_gratuita' ||
    item.visualResource?.includes('nanobanana');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden space-y-0 relative">
      {/* Top action header */}
      <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            {item.courseId}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wide text-blue-400 block">
                Item de Avaliação ENADE / PAI
              </span>
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Auditado pelo Agente PAI
              </span>
              {hasVisualResource && (
                <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  Recurso Visual IA (.jpg)
                </span>
              )}
            </div>
            <span className="text-sm font-bold text-white">
              {item.courseName} • <span className="font-mono text-slate-400 text-xs">{item.ordinance}</span>
            </span>
          </div>
        </div>

        {/* View Switcher & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Botão Free AI Visual Studio */}
          <button
            onClick={() => {
              setIsFreeAiModalOpen(true);
              if (!freeAiGeneratedVisual) {
                handleGenerateFreeAiVisual();
              }
            }}
            className="px-2.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition-all"
            title="Gerar ou regenerar imagem / tabela técnica com IA Gratuita"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Criar c/ IA Gratuita</span>
          </button>

          <div className="bg-slate-800 p-1 rounded-lg flex items-center gap-1 border border-slate-700">
            <button
              onClick={() => setActiveView('preview')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors ${
                activeView === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visualizar Prova</span>
            </button>
            <button
              onClick={() => {
                setEditedMarkdown(item.rawMarkdown);
                setActiveView('edit');
              }}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors ${
                activeView === 'edit' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Texto</span>
            </button>
            <button
              onClick={() => setActiveView('raw')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors ${
                activeView === 'raw' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Código Markdown</span>
            </button>
          </div>

          <button
            onClick={handleSave}
            disabled={isSavedInBank}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              isSavedInBank
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSavedInBank ? 'Salvo no Banco' : 'Salvar no Banco'}</span>
          </button>
        </div>
      </div>

      {/* PAINEL DO AGENTE AUDITOR E REVISOR PAI IMPACTA */}
      <div className="bg-indigo-900/5 border-b border-indigo-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-slate-900">
                  Auditoria de Boas Práticas Pedagógicas — Guia PAI Impacta (2024-2)
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  100% de Conformidade
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                O item foi validado pelo Agente Auditor contra as 10 diretrizes estruturais de itens objetivos de ensino superior.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRunAuditor}
              disabled={isAuditing}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
              title="Executar verificação e autocorreção completa de regras da prova PAI"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Auditando...' : 'Reauditar com Agente PAI'}</span>
            </button>
            <button
              onClick={() => setShowAuditDetails(!showAuditDetails)}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
            >
              <span>{showAuditDetails ? 'Ocultar Checklist' : 'Ver Checklist (10/10)'}</span>
              {showAuditDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {auditFeedback && (
          <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-lg flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{auditFeedback}</span>
          </div>
        )}

        {/* Detailed Checklist Accordion */}
        {showAuditDetails && audit?.checks && (
          <div className="mt-4 pt-3 border-t border-indigo-100/80 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {audit.checks.map((check, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-2.5 rounded-xl border border-indigo-100 shadow-2xs flex items-start gap-2 text-left"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-slate-900 truncate">
                        {check.criterion}
                      </span>
                      <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 px-1 py-0.2 rounded shrink-0">
                        {check.ruleReference}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      {check.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {audit.correctionsApplied && audit.correctionsApplied.length > 0 && (
              <div className="mt-3 p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-900 text-[11px] flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Ações do Agente Pedagógico: </span>
                  <span>{audit.correctionsApplied.join(' • ')}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sub Bar for Exporting */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="font-semibold text-slate-800">Exportar Item:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
            title="Copiar texto formatado em Markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copiado!' : 'Copiar MD'}</span>
          </button>

          <button
            onClick={() => exportItemAsDOCX(item)}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-blue-700 flex items-center gap-1.5 transition-colors"
            title="Baixar em formato Word DOCX"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Word (DOCX)</span>
          </button>

          <button
            onClick={() => exportItemAsLaTeX(item)}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-indigo-700 flex items-center gap-1.5 transition-colors"
            title="Baixar código LaTeX compatível com pacote exam"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>LaTeX (.tex)</span>
          </button>

          <button
            onClick={() => exportItemAsJSON(item)}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
            title="Baixar JSON estruturado com metadados"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <button
            onClick={() => printOfficialEnadeSheet(item)}
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            title="Abrir tela de impressão oficial / Salvar como PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {activeView === 'edit' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Edição Direta do Item ENADE (Markdown)
              </label>
              <button
                onClick={handleApplyEdit}
                className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Aplicar e Atualizar Visualização
              </button>
            </div>
            <textarea
              value={editedMarkdown}
              onChange={(e) => setEditedMarkdown(e.target.value)}
              rows={22}
              className="w-full text-xs p-4 font-mono bg-slate-900 text-slate-100 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
        ) : activeView === 'raw' ? (
          <div>
            <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto border border-slate-800 leading-relaxed max-h-[600px] overflow-y-auto">
              {item.rawMarkdown}
            </pre>
          </div>
        ) : (
          /* Official ENADE Render View */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Faculdade Impacta */}
            <div className="border-b-2 border-slate-900 pb-4 text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 block">
                FACULDADE IMPACTA
              </span>
              <span className="text-xs font-bold text-slate-800 block">
                Coordenação de Graduação • Cursos de Tecnologia e Computação
              </span>
              <span className="text-sm font-extrabold text-blue-900 uppercase block mt-1">
                Avaliação Formativa e Banco de Itens ENADE — Prova PAI
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-0.5 block">
                {item.courseName} ({item.ordinance})
              </span>
            </div>

            {/* Markdown rendered body */}
            <div className="prose prose-slate max-w-none prose-sm prose-headings:font-extrabold prose-headings:text-slate-900 prose-p:leading-relaxed prose-table:border-collapse prose-th:bg-slate-100 prose-th:p-2 prose-td:p-2 prose-td:border prose-th:border prose-th:border-slate-300 prose-td:border-slate-300">
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => (
                    <div className="my-5 p-3 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs text-center">
                      <img
                        {...props}
                        referrerPolicy="no-referrer"
                        className="rounded-xl border border-slate-200 max-h-[440px] mx-auto shadow-sm object-contain w-auto max-w-full"
                      />
                    </div>
                  )
                }}
              >
                {item.rawMarkdown}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE GERAÇÃO COM IA GRATUITA */}
      {isFreeAiModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-200" />
                <div>
                  <h3 className="text-sm font-bold">Estúdio Visual com IA Gratuita (Formato JPG)</h3>
                  <p className="text-[11px] text-blue-100">
                    Gere esquemas técnicos ou tabelas gráficas comparativas em JPG com IA Gratuita para o Texto-Base
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFreeAiModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Type Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Tipo de Recurso Visual a Criar (Formato JPG):
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setFreeAiType('imagem')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      freeAiType === 'imagem'
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 text-blue-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <ImageIcon className={`w-5 h-5 ${freeAiType === 'imagem' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div>
                      <span className="text-xs block font-bold">Imagem / Esquema Técnico (.jpg)</span>
                      <span className="text-[10px] text-slate-500 font-normal">Diagrama arquitetural com IA Gratuita</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setFreeAiType('tabela')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      freeAiType === 'tabela'
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 text-blue-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Table2 className={`w-5 h-5 ${freeAiType === 'tabela' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div>
                      <span className="text-xs block font-bold">Tabela Gráfica (.jpg)</span>
                      <span className="text-[10px] text-slate-500 font-normal">Quadro comparativo com IA Gratuita</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Prompt */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Instruções Adicionais para a Imagem/Tabela (Opcional):
                </label>
                <textarea
                  value={freeAiCustomPrompt}
                  onChange={(e) => setFreeAiCustomPrompt(e.target.value)}
                  placeholder="Exemplo: Destaque a camada de banco de dados distribuído em azul, o cluster de microsserviços em verde..."
                  rows={2}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>

              {/* Preview Area */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 min-h-[220px] flex flex-col items-center justify-center">
                {isGeneratingVisual ? (
                  <div className="text-center space-y-2 py-8">
                    <RefreshCw className="w-7 h-7 text-blue-600 animate-spin mx-auto" />
                    <p className="text-xs font-bold text-slate-800">
                      Criando recurso visual com IA Gratuita...
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Sintetizando {freeAiType === 'tabela' ? 'tabela gráfica' : 'esquema técnico'} em formato JPG
                    </p>
                  </div>
                ) : freeAiGeneratedVisual ? (
                  <div className="space-y-2 w-full text-center">
                    <img
                      src={freeAiGeneratedVisual.imageUrl}
                      alt={freeAiGeneratedVisual.caption}
                      referrerPolicy="no-referrer"
                      className="rounded-lg border border-slate-200 max-h-[200px] mx-auto shadow-xs object-contain"
                    />
                    <span className="text-[11px] text-slate-600 font-medium block">
                      {freeAiGeneratedVisual.caption}
                    </span>
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-400">
                    <Sparkles className="w-8 h-8 mx-auto text-slate-300 mb-1" />
                    <p className="text-xs">Clique no botão abaixo para gerar uma prévia com IA Gratuita</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
              <button
                onClick={handleGenerateFreeAiVisual}
                disabled={isGeneratingVisual}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingVisual ? 'animate-spin text-blue-600' : ''}`} />
                <span>{freeAiGeneratedVisual ? 'Gerar Outra Versão' : 'Gerar com IA Gratuita'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFreeAiModalOpen(false)}
                  className="px-3.5 py-2 text-xs text-slate-600 hover:bg-slate-200 rounded-xl transition-colors font-medium"
                >
                  Fechar
                </button>
                <button
                  onClick={handleInsertFreeAiVisual}
                  disabled={!freeAiGeneratedVisual}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Inserir no Texto-Base</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
