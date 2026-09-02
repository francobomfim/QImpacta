import React from 'react';
import { 
  GraduationCap, 
  Layers, 
  Database, 
  BookOpen, 
  HelpCircle, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { CourseId } from '../types/enade';
import { ENADE_COURSES } from '../data/enadeMatrix';

interface HeaderProps {
  activeTab: 'elaboracao' | 'banco' | 'matriz' | 'guia';
  setActiveTab: (tab: 'elaboracao' | 'banco' | 'matriz' | 'guia') => void;
  selectedCourse: CourseId;
  setSelectedCourse: (course: CourseId) => void;
  bankCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCourse,
  setSelectedCourse,
  bankCount
}) => {
  const currentCourse = ENADE_COURSES[selectedCourse];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner / Faculdade Impacta Identification */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400 tracking-wide">FACULDADE IMPACTA</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Sistema de Elaboração de Itens ENADE — Cursos de Tecnologia e Computação</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Matrizes 3D Curriculares Ativas
            </span>
            <span>•</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
              Portarias 157, 161, 168, 169, 172
            </span>
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Course Picker */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-700/20 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-900 leading-tight tracking-tight">
                Gerador de Itens ENADE
              </h1>
              <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                Impacta 3D
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <span>Curso Ativo:</span>
              <span className="font-semibold text-slate-700">{currentCourse.name}</span>
              <span className="text-slate-400 font-mono text-[10px]">({currentCourse.ordinance})</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            id="nav-tab-elaboracao"
            onClick={() => setActiveTab('elaboracao')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'elaboracao'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. Elaboração & Geração</span>
          </button>

          <button
            id="nav-tab-banco"
            onClick={() => setActiveTab('banco')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition-all relative ${
              activeTab === 'banco'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>2. Banco de Questões</span>
            {bankCount > 0 && (
              <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.2 rounded-full">
                {bankCount}
              </span>
            )}
          </button>

          <button
            id="nav-tab-matriz"
            onClick={() => setActiveTab('matriz')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'matriz'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3. Matriz 3D Geral</span>
          </button>

          <button
            id="nav-tab-guia"
            onClick={() => setActiveTab('guia')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'guia'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>4. Guia de Elaboração</span>
          </button>
        </div>
      </div>
    </header>
  );
};
