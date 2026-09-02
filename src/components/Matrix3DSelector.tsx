import React, { useState } from 'react';
import { 
  Check, 
  AlertCircle, 
  Layers, 
  HelpCircle, 
  Compass, 
  BrainCircuit, 
  FileCode2,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { CourseId, MatrixItem } from '../types/enade';
import { ENADE_COURSES } from '../data/enadeMatrix';

interface Matrix3DSelectorProps {
  selectedCourse: CourseId;
  setSelectedCourse: (course: CourseId) => void;
  selectedX: string[];
  setSelectedX: (items: string[]) => void;
  selectedY: string[];
  setSelectedY: (items: string[]) => void;
  selectedZ: string[];
  setSelectedZ: (items: string[]) => void;
  onApplyPreset?: (presetName: string) => void;
}

export const Matrix3DSelector: React.FC<Matrix3DSelectorProps> = ({
  selectedCourse,
  setSelectedCourse,
  selectedX,
  setSelectedX,
  selectedY,
  setSelectedY,
  selectedZ,
  setSelectedZ
}) => {
  const course = ENADE_COURSES[selectedCourse];
  const [zSearch, setZSearch] = useState('');

  const toggleItem = (list: string[], setList: (items: string[]) => void, itemText: string) => {
    if (list.includes(itemText)) {
      setList(list.filter(i => i !== itemText));
    } else {
      if (list.length >= 3) {
        // Can replace or notify
        return;
      }
      setList([...list, itemText]);
    }
  };

  const handleCourseChange = (newCourse: CourseId) => {
    setSelectedCourse(newCourse);
    setSelectedX([]);
    setSelectedY([]);
    setSelectedZ([]);
  };

  const loadExamplePreset = () => {
    if (selectedCourse === 'RC') {
      setSelectedX([course.eixoX[0].description]);
      setSelectedY([course.eixoY[4].description]); // Y5
      setSelectedZ([course.eixoZ[10].description, course.eixoZ[15].description]); // Z11, Z16
    } else if (selectedCourse === 'CC') {
      setSelectedX([course.eixoX[4].description]);
      setSelectedY([course.eixoY[0].description, course.eixoY[7].description]);
      setSelectedZ([course.eixoZ[0].description, course.eixoZ[17].description]);
    } else if (selectedCourse === 'ADS') {
      setSelectedX([course.eixoX[0].description]);
      setSelectedY([course.eixoY[3].description, course.eixoY[5].description]);
      setSelectedZ([course.eixoZ[1].description, course.eixoZ[16].description]);
    } else if (selectedCourse === 'EC') {
      setSelectedX([course.eixoX[0].description]);
      setSelectedY([course.eixoY[2].description, course.eixoY[7].description]);
      setSelectedZ([course.eixoZ[10].description, course.eixoZ[11].description]);
    } else {
      setSelectedX([course.eixoX[2].description]);
      setSelectedY([course.eixoY[3].description, course.eixoY[7].description]);
      setSelectedZ([course.eixoZ[6].description, course.eixoZ[17].description]);
    }
  };

  const filteredZ = course.eixoZ.filter(z => 
    z.description.toLowerCase().includes(zSearch.toLowerCase()) || 
    z.code.toLowerCase().includes(zSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Course Selection Cards */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">1</span>
              <span>Selecione a Área / Curso de Avaliação ENADE</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cada curso possui sua respectiva matriz tridimensional de competências e habilidades da Faculdade Impacta.
            </p>
          </div>

          <button
            type="button"
            onClick={loadExamplePreset}
            className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preencher Exemplo Oficial do Curso</span>
          </button>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {(Object.keys(ENADE_COURSES) as CourseId[]).map((courseKey) => {
            const c = ENADE_COURSES[courseKey];
            const isSelected = selectedCourse === courseKey;
            return (
              <button
                key={courseKey}
                id={`course-select-${courseKey.toLowerCase()}`}
                type="button"
                onClick={() => handleCourseChange(courseKey)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-600/15'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {c.id}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{c.degree}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">{c.name}</h3>
                <p className="text-[10px] text-slate-500 mt-1 font-mono">{c.ordinance}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Matrix Selection (X, Y, Z) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Eixo X: Perfil do Concluinte */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                X
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Eixo X: Perfil do Concluinte</h3>
                <p className="text-[10px] text-slate-500">Selecione de 1 a 3 características</p>
              </div>
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
              selectedX.length >= 1 && selectedX.length <= 3 
                ? 'bg-indigo-100 text-indigo-800' 
                : 'bg-rose-100 text-rose-800'
            }`}>
              {selectedX.length}/3
            </span>
          </div>

          <div className="p-4 space-y-2.5 flex-1 max-h-[420px] overflow-y-auto">
            {course.eixoX.map((item, index) => {
              const isChecked = selectedX.includes(item.description);
              const isDisabled = !isChecked && selectedX.length >= 3;
              return (
                <div
                  key={item.id}
                  onClick={() => !isDisabled && toggleItem(selectedX, setSelectedX, item.description)}
                  className={`p-3 rounded-xl border text-xs leading-relaxed cursor-pointer transition-all flex items-start gap-2.5 ${
                    isChecked
                      ? 'border-indigo-500 bg-indigo-50/50 text-indigo-950 font-medium'
                      : isDisabled
                      ? 'border-slate-100 bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-md mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                    isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-[11px] mr-1.5 text-indigo-700">{index + 1}.</span>
                    <span>{item.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Eixo Y: Habilidades (Comp I e II) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                Y
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Eixo Y: Habilidades (Comp. I/II)</h3>
                <p className="text-[10px] text-slate-500">Selecione de 1 a 3 habilidades</p>
              </div>
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
              selectedY.length >= 1 && selectedY.length <= 3 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-rose-100 text-rose-800'
            }`}>
              {selectedY.length}/3
            </span>
          </div>

          <div className="p-4 space-y-3 flex-1 max-h-[420px] overflow-y-auto">
            {/* Competência I */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Competência I (Fundamentos & Métodos)
              </span>
              <div className="mt-2 space-y-2">
                {course.eixoY.filter(y => y.competency === 'Competência I').map((item) => {
                  const isChecked = selectedY.includes(item.description);
                  const isDisabled = !isChecked && selectedY.length >= 3;
                  return (
                    <div
                      key={item.id}
                      onClick={() => !isDisabled && toggleItem(selectedY, setSelectedY, item.description)}
                      className={`p-2.5 rounded-xl border text-xs leading-relaxed cursor-pointer transition-all flex items-start gap-2.5 ${
                        isChecked
                          ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-medium'
                          : isDisabled
                          ? 'border-slate-100 bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <span className="font-bold font-mono text-[10px] mr-1.5 text-emerald-700">{item.code}.</span>
                        <span>{item.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Competência II */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                Competência II (Aplicação, Gestão & Impactos)
              </span>
              <div className="mt-2 space-y-2">
                {course.eixoY.filter(y => y.competency === 'Competência II').map((item) => {
                  const isChecked = selectedY.includes(item.description);
                  const isDisabled = !isChecked && selectedY.length >= 3;
                  return (
                    <div
                      key={item.id}
                      onClick={() => !isDisabled && toggleItem(selectedY, setSelectedY, item.description)}
                      className={`p-2.5 rounded-xl border text-xs leading-relaxed cursor-pointer transition-all flex items-start gap-2.5 ${
                        isChecked
                          ? 'border-teal-500 bg-teal-50/50 text-teal-950 font-medium'
                          : isDisabled
                          ? 'border-slate-100 bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <span className="font-bold font-mono text-[10px] mr-1.5 text-teal-700">{item.code}.</span>
                        <span>{item.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Eixo Z: Objetos de Conhecimento */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                Z
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Eixo Z: Objetos de Conhecimento</h3>
                <p className="text-[10px] text-slate-500">Selecione de 1 a 3 objetos (Z1..Z20)</p>
              </div>
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
              selectedZ.length >= 1 && selectedZ.length <= 3 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-rose-100 text-rose-800'
            }`}>
              {selectedZ.length}/3
            </span>
          </div>

          <div className="p-3 border-b border-slate-100">
            <input
              type="text"
              value={zSearch}
              onChange={(e) => setZSearch(e.target.value)}
              placeholder="Filtrar objetos (ex: Redes, Algoritmos, IA)..."
              className="w-full text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="p-4 space-y-2 flex-1 max-h-[360px] overflow-y-auto">
            {filteredZ.map((item) => {
              const isChecked = selectedZ.includes(item.description);
              const isDisabled = !isChecked && selectedZ.length >= 3;
              return (
                <div
                  key={item.id}
                  onClick={() => !isDisabled && toggleItem(selectedZ, setSelectedZ, item.description)}
                  className={`p-2.5 rounded-xl border text-xs leading-relaxed cursor-pointer transition-all flex items-start gap-2.5 ${
                    isChecked
                      ? 'border-blue-500 bg-blue-50/50 text-blue-950 font-medium'
                      : isDisabled
                      ? 'border-slate-100 bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-md mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                    isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-bold font-mono text-[10px] mr-1.5 text-blue-700">{item.code}.</span>
                    <span>{item.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
