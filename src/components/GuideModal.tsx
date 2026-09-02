import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Target, 
  Award, 
  FileSpreadsheet, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  FileCheck,
  Layers,
  Clock,
  BookMarked
} from 'lucide-react';

export const GuideModal: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                  Faculdade Impacta • Prova PAI 2024-2
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  Guia Oficial
                </span>
              </div>
              <h2 className="text-base font-extrabold text-slate-900 mt-0.5">
                Guia de Elaboração de Questões Objetivas — Prova PAI & Formato ENADE
              </h2>
              <p className="text-xs text-slate-500">
                Diretrizes de construção, critérios de qualidade e boas práticas para avaliação de graduados em Computação e TI.
              </p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl flex items-center gap-3 shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <div>
              <span className="text-xs font-bold text-indigo-950 block">Agente Verificador Integrado</span>
              <span className="text-[10px] text-indigo-700">Auditoria automática de 100% das regras</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Contexto e os 3Cs */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm border-b border-slate-100 pb-3">
          <Layers className="w-5 h-5 text-blue-600" />
          <span>1. O Programa PAI e a Demanda Tridimensional (os 3Cs)</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          O <strong>Programa de Aprendizagem Interdisciplinar (PAI)</strong> da Faculdade Impacta aplica três provas presenciais (PAI-1, PAI-2 e PAI-3), com questões em sua maioria de múltipla escolha e até três questões dissertativas correspondentes aos conteúdos aprendidos, em consonância com o formato ENADE e os Projetos Pedagógicos de Curso (PPCs).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-extrabold text-blue-700 block">1º C — Características do Egresso (X)</span>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Atributos e qualidades do concluinte: raciocínio lógico, postura ética, inovação, sustentabilidade e rigor metodológico.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-extrabold text-indigo-700 block">2º C — Competências e Habilidades (Y)</span>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Operações cognitivas aplicadas: análise crítica, concepção de arquiteturas, avaliação de segurança e resolução prática de problemas.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-extrabold text-purple-700 block">3º C — Conteúdos / Objetos (Z)</span>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Corpo de conhecimentos técnicos específicos: algoritmos, banco de dados, redes, engenharia de software, segurança, SO e concorrência.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Tipos de Questões */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Resposta Única */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
            <Target className="w-4 h-4" />
            <span>Itens de Resposta Única (4.1.1)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li>• Situação-estímulo autêntica.</li>
            <li>• Enunciado claro em ordem direta.</li>
            <li>• 5 alternativas (A..E) com 1 gabarito e 4 distratores plausíveis.</li>
            <li>• Formato trapezoidal e paralelismo sintático.</li>
            <li>• Proibição de pegadinhas ou termos absolutos.</li>
          </ul>
        </div>

        {/* Resposta Múltipla */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Resposta Múltipla (4.1.2)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li>• 3 a 5 afirmações (I, II, III...) independentes.</li>
            <li>• Pelo menos 1 afirmação correta e 1 incorreta.</li>
            <li>• Frases que encerram em ponto final.</li>
            <li>• Chave de resposta balanceada onde cada afirmativa aparece na mesma quantidade de vezes e em ordem crescente.</li>
          </ul>
        </div>

        {/* Asserção-Razão */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
            <Scale className="w-4 h-4" />
            <span>Asserção-Razão (4.1.3)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li>• Duas proposições conectadas por <strong>"PORQUE"</strong>.</li>
            <li>• Avaliação de veracidade de cada asserção e da relação de causalidade.</li>
            <li>• Chave padrão canônica de 5 opções estruturadas.</li>
          </ul>
        </div>
      </div>

      {/* 3. As 10 Boas Práticas Obrigatórias */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Checklist das 10 Boas Práticas do Guia PAI Impacta (Seção 5)</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Auditado pelo Agente
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">1. Relevância do Texto-Base (5.2.1)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">O texto-base é indispensável para a solução e não um mero pretexto.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">2. Referências em Formato ABNT (5.2.15)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Todo texto-base deve obrigatoriamente conter a referência bibliográfica conforme a ABNT.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">3. Enunciado Afirmativo e Direto (5.1.6 e 5.2.10)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Comandos em ordem direta. <strong>Proibido</strong> solicitar "a incorreta" ou "exceto".</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">4. Proibição de Termos Absolutos (5.2)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Sem uso de "somente", "apenas", "exclusivamente", "sempre", "nunca", "todos".</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">5. Distratores Plausíveis (5.2.3)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Opções erradas verossímeis. Evitar erros absurdos e não criar distrator por inserção de "não".</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">6. Paralelismo Sintático e Semântico (5.2.8)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Mesma estrutura gramatical e classe de palavras nas opções.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">7. Disposição Lógica e Formato Trapezoidal (5.2.4 e 5.2.5)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Alternativas ordenadas logicamente (alfabética, numérica) ou com extensão homogênea.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">8. Justificativas com [CERTO] e [ERRADO] (5.2.6)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Cada opção é fundamentada individualmente para alimentar o banco de itens.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">9. Tempo Estimado de ~4 Minutos (5.2.13)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Complexidade calibrada para resolução no tempo limite da prova.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">10. Aplicação Sem Consulta e Sem Calculadora (5.2.12)</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Não exigir cálculos manuais excessivos ou memorização de constantes arbitrárias.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
