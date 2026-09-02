import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Database, 
  Search, 
  Trash2, 
  Eye, 
  FileDown, 
  FileText, 
  Printer, 
  Layers, 
  SlidersHorizontal,
  X,
  ExternalLink,
  PlusCircle,
  Copy,
  Check
} from 'lucide-react';
import { EnadeItem, CourseId } from '../types/enade';
import { 
  exportItemAsDOCX, 
  exportItemAsLaTeX, 
  exportItemAsJSON, 
  exportMultipleItemsAsJSON, 
  printOfficialEnadeSheet 
} from '../utils/exportUtils';

interface QuestionBankProps {
  items: EnadeItem[];
  onDeleteItem: (id: string) => void;
  onSelectToView: (item: EnadeItem) => void;
  onNavigateToCreate: () => void;
}

export const QuestionBank: React.FC<QuestionBankProps> = ({
  items,
  onDeleteItem,
  onSelectToView,
  onNavigateToCreate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('ALL');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [previewModalItem, setPreviewModalItem] = useState<EnadeItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = items.filter((item) => {
    const matchCourse = selectedCourseFilter === 'ALL' || item.courseId === selectedCourseFilter;
    const matchType = selectedTypeFilter === 'ALL' || item.questionType === selectedTypeFilter;
    const matchSearch =
      searchTerm === '' ||
      item.rawMarkdown.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchCourse && matchType && matchSearch;
  });

  const handleCopy = (item: EnadeItem) => {
    navigator.clipboard.writeText(item.rawMarkdown);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header of Bank */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900">
              Banco de Questões & Provas ENADE
            </h2>
            <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
              {items.length} {items.length === 1 ? 'questão salva' : 'questões salvas'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Repositório de itens elaborados e validados segundo as diretrizes curriculares e matrizes de referência dos cursos de Computação e TI da Faculdade Impacta.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onNavigateToCreate}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Elaborar Nova Questão</span>
          </button>

          {items.length > 0 && (
            <button
              onClick={() => exportMultipleItemsAsJSON(items)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 flex items-center gap-2 transition-colors"
              title="Exportar todas as questões em um único arquivo JSON estruturado"
            >
              <FileDown className="w-4 h-4 text-slate-600" />
              <span>Exportar Banco (JSON)</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por palavras, tópicos, Z1..Z20..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Course filter */}
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">Todos os Cursos</option>
            <option value="CC">Ciência da Computação (Portaria 157)</option>
            <option value="EC">Engenharia de Computação (Portaria 161)</option>
            <option value="ADS">Análise e Desenv. Sistemas (Portaria 169)</option>
            <option value="SI">Sistemas de Informação (Portaria 168)</option>
            <option value="RC">Redes de Computadores (Portaria 172)</option>
          </select>

          {/* Type filter */}
          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">Todos os Formatos</option>
            <option value="objetiva_unica">Objetiva - Resposta Única</option>
            <option value="objetiva_multipla">Objetiva - Afirmativas (I, II, III)</option>
            <option value="discursiva">Discursiva / Dissertativa</option>
          </select>
        </div>
      </div>

      {/* Item List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <Database className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700">Nenhuma questão encontrada</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            {items.length === 0 
              ? 'O banco ainda está vazio. Crie sua primeira questão utilizando a Matriz 3D oficial.'
              : 'Nenhuma questão corresponde aos filtros selecionados. Tente ajustar os termos de busca.'}
          </p>
          {items.length === 0 && (
            <button
              onClick={onNavigateToCreate}
              className="mt-4 px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl inline-flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Criar Primeira Questão</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-blue-600 text-white">
                      {item.courseId}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {item.courseName}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      • {item.ordinance}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.questionType === 'discursiva' 
                        ? 'Discursiva' 
                        : item.questionType === 'objetiva_multipla'
                        ? 'Objetiva (Afirmativas)'
                        : 'Objetiva (Única)'}
                    </span>
                  </div>

                  {/* Summary snippet */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.rawMarkdown.replace(/###.*/g, '').replace(/---/g, '').trim().slice(0, 220)}...
                  </p>

                  {/* Badges for X, Y, Z */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded border border-indigo-100">
                      Eixo X: {item.selectedX.length} perfil(is)
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-100">
                      Eixo Y: {item.selectedY.length} hab(s)
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-100">
                      Eixo Z: {item.selectedZ.length} objeto(s)
                    </span>
                    {item.visualResource !== 'nenhum' && (
                      <span className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-200">
                        {item.visualResource}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 self-end md:self-center border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <button
                    onClick={() => handleCopy(item)}
                    className="p-2 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                    title="Copiar Markdown"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setPreviewModalItem(item)}
                    className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visualizar</span>
                  </button>

                  <button
                    onClick={() => exportItemAsDOCX(item)}
                    className="p-2 text-slate-500 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 rounded-lg transition-colors border border-slate-200"
                    title="Exportar para Word (DOCX)"
                  >
                    <FileText className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => printOfficialEnadeSheet(item)}
                    className="p-2 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                    title="Imprimir / Salvar PDF"
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
                    title="Excluir questão do banco"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-extrabold px-2 py-0.5 bg-blue-600 rounded">
                  {previewModalItem.courseId}
                </span>
                <span className="text-xs font-bold">{previewModalItem.courseName}</span>
              </div>
              <button
                onClick={() => setPreviewModalItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="prose prose-slate max-w-none prose-sm prose-headings:font-bold prose-headings:text-slate-900">
                <ReactMarkdown>{previewModalItem.rawMarkdown}</ReactMarkdown>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportItemAsDOCX(previewModalItem)}
                  className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Word DOCX</span>
                </button>
                <button
                  onClick={() => exportItemAsLaTeX(previewModalItem)}
                  className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <span>LaTeX</span>
                </button>
                <button
                  onClick={() => printOfficialEnadeSheet(previewModalItem)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir / PDF</span>
                </button>
              </div>

              <button
                onClick={() => setPreviewModalItem(null)}
                className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
