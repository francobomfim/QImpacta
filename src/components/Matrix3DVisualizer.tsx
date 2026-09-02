import React, { useState } from 'react';
import { Layers, GraduationCap, FileCheck, BookOpen, Search } from 'lucide-react';
import { CourseId } from '../types/enade';
import { ENADE_COURSES } from '../data/enadeMatrix';

export const Matrix3DVisualizer: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<CourseId>('CC');
  const [filterQuery, setFilterQuery] = useState('');

  const course = ENADE_COURSES[selectedCourse];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Matriz 3D Multidimensional de Computação e TI — Faculdade Impacta
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Consulte as diretrizes e eixos de avaliação estipulados para os 5 cursos da área de Computação e TI.
            </p>
          </div>

          {/* Course Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(Object.keys(ENADE_COURSES) as CourseId[]).map((cId) => {
              const c = ENADE_COURSES[cId];
              const isSelected = selectedCourse === cId;
              return (
                <button
                  key={cId}
                  onClick={() => setSelectedCourse(cId)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {c.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Course Header Banner */}
        <div className="mt-5 p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wide text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              {course.degree}
            </span>
            <h3 className="text-sm font-extrabold text-slate-900 mt-1">
              {course.name}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">{course.description}</p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <span className="text-[11px] font-mono font-bold text-blue-800 block">
              {course.ordinance}
            </span>
            <span className="text-[10px] text-slate-500">Matriz de Referência Curricular</span>
          </div>
        </div>
      </div>

      {/* 3 Axes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Eixo X */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
              X
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Eixo X: Perfil do Concluinte</h4>
              <p className="text-[10px] text-slate-500">5 características fundamentais do egresso</p>
            </div>
          </div>

          <div className="space-y-3">
            {course.eixoX.map((x, idx) => (
              <div key={x.id} className="p-3 rounded-xl bg-indigo-50/40 border border-indigo-100 text-xs text-slate-800 leading-relaxed">
                <span className="font-bold text-indigo-700 block mb-1">
                  Característica X{idx + 1}:
                </span>
                {x.description}
              </div>
            ))}
          </div>
        </div>

        {/* Eixo Y */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
              Y
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Eixo Y: Habilidades (Comp. I e II)</h4>
              <p className="text-[10px] text-slate-500">11 habilidades cognitivas e aplicadas</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded block mb-2">
                Competência I (Fundamentos e Métodos)
              </span>
              <div className="space-y-2">
                {course.eixoY.filter(y => y.competency === 'Competência I').map((y) => (
                  <div key={y.id} className="p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-100 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
                    <span className="font-mono font-bold text-emerald-700 text-[11px] shrink-0">{y.code}</span>
                    <span>{y.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded block mb-2">
                Competência II (Aplicação, Riscos e Impactos)
              </span>
              <div className="space-y-2">
                {course.eixoY.filter(y => y.competency === 'Competência II').map((y) => (
                  <div key={y.id} className="p-2.5 rounded-xl bg-teal-50/40 border border-teal-100 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
                    <span className="font-mono font-bold text-teal-700 text-[11px] shrink-0">{y.code}</span>
                    <span>{y.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Eixo Z */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
              Z
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Eixo Z: Objetos de Conhecimento</h4>
              <p className="text-[10px] text-slate-500">20 conteúdos programáticos (Z1..Z20)</p>
            </div>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {course.eixoZ.map((z) => (
              <div key={z.id} className="p-2.5 rounded-xl bg-blue-50/30 border border-blue-100 text-xs text-slate-800 leading-relaxed flex items-center gap-2">
                <span className="font-mono font-bold text-blue-700 text-[10px] w-6 shrink-0">{z.code}</span>
                <span className="font-medium">{z.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
