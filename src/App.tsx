import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  Matrix3DSelector 
} from './components/Matrix3DSelector';
import { 
  QuestionConfigPanel 
} from './components/QuestionConfigPanel';
import { 
  GeneratedItemViewer 
} from './components/GeneratedItemViewer';
import { 
  QuestionBank 
} from './components/QuestionBank';
import { 
  Matrix3DVisualizer 
} from './components/Matrix3DVisualizer';
import { 
  GuideModal 
} from './components/GuideModal';

import { 
  CourseId, 
  QuestionType, 
  VisualResource, 
  EnadeItem 
} from './types/enade';
import { ENADE_COURSES } from './data/enadeMatrix';
import { SAMPLE_QUESTIONS } from './data/sampleQuestions';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'elaboracao' | 'banco' | 'matriz' | 'guia'>('elaboracao');
  
  // Matrix 3D Selections
  const [selectedCourse, setSelectedCourse] = useState<CourseId>('RC');
  const [selectedX, setSelectedX] = useState<string[]>([
    ENADE_COURSES['RC'].eixoX[0].description
  ]);
  const [selectedY, setSelectedY] = useState<string[]>([
    ENADE_COURSES['RC'].eixoY[4].description // Y5 Administrar infraestruturas
  ]);
  const [selectedZ, setSelectedZ] = useState<string[]>([
    ENADE_COURSES['RC'].eixoZ[10].description, // Z11 Virtualização
    ENADE_COURSES['RC'].eixoZ[15].description  // Z16 Gerenciamento
  ]);

  // Question Structure Configuration
  const [questionType, setQuestionType] = useState<QuestionType>('objetiva_unica');
  const [visualResource, setVisualResource] = useState<VisualResource>('tabela_markdown');
  const [customContext, setCustomContext] = useState<string>(
    'Uma empresa de comércio eletrônico de médio porte está modernizando sua infraestrutura computacional para suportar picos de tráfego durante datas comemorativas.'
  );
  
  // Anexo
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [attachmentContent, setAttachmentContent] = useState<string | null>(null);

  // Generation State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<EnadeItem | null>(SAMPLE_QUESTIONS[0]);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Question Bank State (persisted in localStorage)
  const [questionBank, setQuestionBank] = useState<EnadeItem[]>(() => {
    try {
      const saved = localStorage.getItem('enade_question_bank_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return SAMPLE_QUESTIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('enade_question_bank_v1', JSON.stringify(questionBank));
    } catch (e) {
      console.warn('Failed to save questions to localStorage:', e);
    }
  }, [questionBank]);

  // File Upload Handler
  const handleFileUpload = (file: File) => {
    setAttachmentName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        setAttachmentContent(text);
      }
    };
    reader.readAsText(file);
  };

  const handleRemoveAttachment = () => {
    setAttachmentName(null);
    setAttachmentContent(null);
  };

  // Validation
  const validationErrors: string[] = [];
  if (selectedX.length === 0) validationErrors.push('Selecione pelo menos 1 característica no Eixo X (Perfil).');
  if (selectedX.length > 3) validationErrors.push('Máximo de 3 características permitidas no Eixo X.');
  if (selectedY.length === 0) validationErrors.push('Selecione pelo menos 1 habilidade no Eixo Y.');
  if (selectedY.length > 3) validationErrors.push('Máximo de 3 habilidades permitidas no Eixo Y.');
  if (selectedZ.length === 0) validationErrors.push('Selecione pelo menos 1 objeto no Eixo Z.');
  if (selectedZ.length > 3) validationErrors.push('Máximo de 3 objetos permitidos no Eixo Z.');

  const isValidToGenerate = validationErrors.length === 0;

  // Generation Action
  const handleGenerate = async () => {
    if (!isValidToGenerate || isGenerating) return;

    setIsGenerating(true);
    setGenerationError(null);

    const courseData = ENADE_COURSES[selectedCourse];

    try {
      const response = await fetch('/api/generate-enade-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourse,
          courseName: courseData.name,
          ordinance: courseData.ordinance,
          selectedX,
          selectedY,
          selectedZ,
          questionType,
          visualResource,
          customContext: customContext.trim(),
          attachmentName,
          attachmentContent
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do servidor');
      }

      const data = await response.json();
      if (!data.markdown) {
        throw new Error('Retorno vazio da geração');
      }

      const newItem: EnadeItem = {
        id: `enade-${selectedCourse.toLowerCase()}-${Date.now()}`,
        createdAt: new Date().toISOString(),
        courseId: selectedCourse,
        courseName: courseData.name,
        ordinance: courseData.ordinance,
        selectedX: [...selectedX],
        selectedY: [...selectedY],
        selectedZ: [...selectedZ],
        questionType,
        visualResource,
        customContext: customContext.trim() || undefined,
        attachmentName: attachmentName || undefined,
        attachmentContent: attachmentContent || undefined,
        rawMarkdown: data.markdown,
        metadata: {
          curso: courseData.name,
          cursoId: selectedCourse,
          perfilX: [...selectedX],
          habilidadeY: [...selectedY],
          objetoZ: [...selectedZ],
          tipoQuestao: questionType,
          recursoVisual: visualResource,
          fonteContexto: customContext ? 'Baseado no Texto-Base Informado' : 'Elaborado pela IA'
        },
        textoBase: '',
        enunciado: '',
        gabarito: '',
        justificativa: '',
        tags: [selectedCourse, questionType, visualResource],
        auditReport: data.auditReport
      };

      setCurrentItem(newItem);
    } catch (err: any) {
      console.error('Generation failed:', err);
      setGenerationError(err.message || 'Erro ao conectar ao gerador de questões.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Bank Actions
  const handleSaveToBank = (itemToSave: EnadeItem) => {
    if (!questionBank.some(item => item.id === itemToSave.id)) {
      setQuestionBank([itemToSave, ...questionBank]);
    }
  };

  const handleDeleteFromBank = (id: string) => {
    setQuestionBank(questionBank.filter(item => item.id !== id));
  };

  const handleSelectToView = (item: EnadeItem) => {
    setCurrentItem(item);
    setActiveTab('elaboracao');
  };

  const isCurrentSaved = currentItem ? questionBank.some(i => i.id === currentItem.id) : false;

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans">
      {/* Header with Navigation and Course State */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        bankCount={questionBank.length}
      />

      {/* Main Tab Views */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-1 space-y-8">
        {activeTab === 'elaboracao' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Step 1: Matrix 3D Selector */}
            <Matrix3DSelector
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              selectedX={selectedX}
              setSelectedX={setSelectedX}
              selectedY={selectedY}
              setSelectedY={setSelectedY}
              selectedZ={selectedZ}
              setSelectedZ={setSelectedZ}
            />

            {/* Step 2: Question Type, Visual Resource, Custom Context & File Attachments */}
            <QuestionConfigPanel
              questionType={questionType}
              setQuestionType={setQuestionType}
              visualResource={visualResource}
              setVisualResource={setVisualResource}
              customContext={customContext}
              setCustomContext={setCustomContext}
              attachmentName={attachmentName}
              attachmentContent={attachmentContent}
              onFileUpload={handleFileUpload}
              onRemoveAttachment={handleRemoveAttachment}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              isValidToGenerate={isValidToGenerate}
              validationErrors={validationErrors}
            />

            {/* Step 3: Real-Time Generated Item Output & Exporter */}
            {generationError && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center justify-between">
                <span>{generationError}</span>
                <button
                  onClick={handleGenerate}
                  className="px-3 py-1 bg-rose-700 text-white rounded-md font-bold hover:bg-rose-800"
                >
                  Tentar Novamente
                </button>
              </div>
            )}

            {currentItem && (
              <div className="pt-2">
                <GeneratedItemViewer
                  item={currentItem}
                  onSaveToBank={handleSaveToBank}
                  isSavedInBank={isCurrentSaved}
                  onUpdateItemContent={(newMarkdown, newAuditReport) => {
                    setCurrentItem({ 
                      ...currentItem, 
                      rawMarkdown: newMarkdown,
                      auditReport: newAuditReport || currentItem.auditReport 
                    });
                  }}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'banco' && (
          <div className="animate-in fade-in duration-300">
            <QuestionBank
              items={questionBank}
              onDeleteItem={handleDeleteFromBank}
              onSelectToView={handleSelectToView}
              onNavigateToCreate={() => setActiveTab('elaboracao')}
            />
          </div>
        )}

        {activeTab === 'matriz' && (
          <div className="animate-in fade-in duration-300">
            <Matrix3DVisualizer />
          </div>
        )}

        {activeTab === 'guia' && (
          <div className="animate-in fade-in duration-300">
            <GuideModal />
          </div>
        )}
      </main>

      {/* Faculdade Impacta Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-700">Faculdade Impacta</span>
            <span>•</span>
            <span className="font-semibold text-slate-800">Sistema de Elaboração e Banco de Questões ENADE</span>
            <span>•</span>
            <span>Cursos de Computação e TI</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>CC (157)</span>
            <span>EC (161)</span>
            <span>ADS (169)</span>
            <span>SI (168)</span>
            <span>RC (172)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
