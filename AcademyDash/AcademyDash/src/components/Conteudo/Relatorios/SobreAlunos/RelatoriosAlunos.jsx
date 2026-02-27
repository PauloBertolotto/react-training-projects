import React, { useEffect, useMemo, useState } from "react";
import { SidebarProvider, SidebarInset } from "../../../ui/sidebar";
import { SiteHeader } from "../../../site-header";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RelatoriosAlunos() {
  const [dadosAlunos, setDadosAlunos] = useState([]);
  const [dadosDisciplinas, setDadosDisciplinas] = useState([]);
  const [dadosFreqDisciplinas, setDadosFreqDisciplinas] = useState([]);
  const [totalAlunosCadastrados, setTotalAlunosCadastrados] = useState(0);
  const [resumo, setResumo] = useState({});

  useEffect(() => {
    const carregarRelatorios = async () => {
      try {
        const [
          resResumo,
          resAlunosDetalhes,
          resDisciplinas,
          resFreqDisciplinas,
        ] = await Promise.all([
          fetch("http://localhost:3333/relatorios/resumo"),
          fetch("http://localhost:3333/relatorios/alunos"),
          fetch("http://localhost:3333/relatorios/disciplinas"),
          fetch("http://localhost:3333/relatorios/frequencia-disciplinas"),
        ]);

        const resumoJson = await resResumo.json();
        const alunosJson = await resAlunosDetalhes.json();
        const disciplinasJson = await resDisciplinas.json();
        const freqJson = await resFreqDisciplinas.json();

        setResumo(resumoJson || {});
        setTotalAlunosCadastrados(resumoJson?.total_alunos ?? 0);

        setDadosAlunos(Array.isArray(alunosJson) ? alunosJson : []);
        setDadosDisciplinas(
          Array.isArray(disciplinasJson) ? disciplinasJson : [],
        );
        setDadosFreqDisciplinas(
          Array.isArray(freqJson)
            ? freqJson.map((d) => ({
                disciplina: d.disciplina,
                media_frequencia: Number(
                  d.media_frequencia ?? d.media ?? d.frequencia ?? 0,
                ),
              }))
            : [],
        );
      } catch (error) {
        console.error("Erro ao carregar relatórios:", error);
        alert("Erro ao carregar relatórios");
      }
    };

    carregarRelatorios();
  }, []);

  const stats = useMemo(() => {
    return {
      totalAlunosComNota: dadosAlunos.length,
      avgNota: Number(resumo?.media_geral ?? 0),
      taxaAprovacao: Number(resumo?.taxa_aprovacao ?? 0),
      aprovados: Math.round(
        (Number(resumo?.taxa_aprovacao ?? 0) / 100) * dadosAlunos.length,
      ),
      topAlunos: [...dadosAlunos].sort((a, b) => b.media - a.media).slice(0, 5),

      disciplinasAvg: dadosDisciplinas,
      disciplinasFreq: dadosFreqDisciplinas,
    };
  }, [dadosAlunos, dadosDisciplinas, dadosFreqDisciplinas, resumo]);

  return (
    <SidebarProvider>
      <SidebarInset className="h-[590px] w-[1200px] bg-[var(--background)] text-[var(--text-dark)] border border-gray-300 rounded-lg shadow-md p-0">
        <div className="w-[1565px] h-[500px] flex flex-col gap-4 overflow-y-auto p-4">
          {/* Cards resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card title="Total de alunos cadastrados">
              {totalAlunosCadastrados}
            </Card>
            <Card title="Alunos com notas">{stats.totalAlunosComNota}</Card>
            <Card title="Média geral">{stats.avgNota}</Card>
            <Card title="Taxa de aprovação">{stats.taxaAprovacao}%</Card>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartCard title="Média por disciplina">
              <BarChart data={stats.disciplinasAvg}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="disciplina" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="media" fill="var(--primary)" />
              </BarChart>
            </ChartCard>

            <ChartCard title="Frequência por disciplina">
              <BarChart data={stats.disciplinasFreq}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="disciplina" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="media_frequencia" fill="var(--secondary)" />
              </BarChart>
            </ChartCard>
          </div>

          {/* Top alunos + gráfico notas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3 bg-[var(--table-bg)] shadow rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3 text-[var(--secondary)]">
                Top 5 Alunos (Média)
              </h3>
              {stats.topAlunos.map((a, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm py-1 border-b border-gray-300 last:border-none"
                >
                  <span>{a.aluno}</span>
                  <span>{a.media}</span>
                </div>
              ))}
            </div>

            <ChartCard title="Notas por aluno">
              <BarChart
                data={[...dadosAlunos]
                  .filter((a) => Number(a.media) > 0)
                  .sort((a, b) => b.media - a.media)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="aluno" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="media" fill="#10B981" /> {/* verde esmeralda */}
              </BarChart>
            </ChartCard>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-[var(--table-bg)] shadow rounded-lg p-4">
      <div className="text-xs text-[var(--secondary)] font-semibold">
        {title}
      </div>
      <div className="mt-1 text-2xl font-bold text-[var(--text-dark)]">
        {children}
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-[var(--table-bg)] shadow rounded-lg p-3 h-[300px]">
      <h3 className="text-sm font-semibold mb-3 text-[var(--secondary)]">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}
