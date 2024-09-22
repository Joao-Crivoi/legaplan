'use client'
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Tarefa/Tarefas.module.scss';
import ModalAdicionarTarefa from '../../components/Tarefas/ModalAdicionarTarefa';
import ModalRemoverTarefa from '../../components/Tarefas/ModalRemoverTarefa';
import Tarefa from '../../components/Tarefas/Tarefa';

type TarefaType = {
  nome: string;
  finalizada: boolean;
};

export default function Tarefas() {
  const [tarefas, setTarefas] = useState<TarefaType[]>([]);
  const [inputTarefa, setInputTarefa] = useState<string>('');
  const [modalAdicionarTarefa, setModalAdicionarTarefa] = useState<boolean>(false);
  const [modalDeletarAberto, setModalDeletarAberto] = useState<boolean>(false);
  const [indiceTarefaDeletar, setIndiceTarefaDeletar] = useState<number | null>(null);

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
      const parsedTarefas = JSON.parse(tarefasSalvas);
      if (Array.isArray(parsedTarefas)) {
        setTarefas(parsedTarefas);
      }
    }
  }, []);

  useEffect(() => {
    if (tarefas.length > 0) {
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
    } else {
      localStorage.removeItem('tarefas');
    }
  }, [tarefas]);

  const abrirModalAdicionarTarefa = () => setModalAdicionarTarefa(true);
  const fecharModalAdicionarTarefa = () => setModalAdicionarTarefa(false);

  const adicionarTarefa = (novaTarefa: string) => {
    if (novaTarefa.trim() === '') return;
    setTarefas(prevTarefas => [...prevTarefas, { nome: novaTarefa, finalizada: false }]);
    setInputTarefa('');
    fecharModalAdicionarTarefa();
  };

  const abrirModalDeletarTarefa = (index: number) => {
    setIndiceTarefaDeletar(index);
    setModalDeletarAberto(true);
  };

  const fecharModalDeletarTarefa = () => {
    setIndiceTarefaDeletar(null);
    setModalDeletarAberto(false);
  };

  const removerTarefa = () => {
    if (indiceTarefaDeletar === null) return;
    setTarefas(tarefas.filter((_, i) => i !== indiceTarefaDeletar));
    fecharModalDeletarTarefa();
  };

  const marcarFinalizada = (index: number) => {
    setTarefas(prevTarefas => {
      return prevTarefas.reduce<TarefaType[]>((novasTarefas, tarefa, i) => {
        if (i === index) {
          novasTarefas.push({ ...tarefa, finalizada: !tarefa.finalizada });
        } else {
          novasTarefas.push(tarefa);
        }
        return novasTarefas;
      }, []);
    });
  };

  const renderizarTarefas = (tarefas: TarefaType[], finalizadas: boolean) => {
    const tarefasFiltradas = tarefas.reduce<React.JSX.Element[]>((acc, tarefa, index) => {
      if (tarefa.finalizada === finalizadas) {
        acc.push(
          <Tarefa
            key={index}
            tarefa={tarefa}
            onToggle={() => marcarFinalizada(index)}
            onDelete={() => abrirModalDeletarTarefa(index)}
          />
        );
      }
      return acc;
    }, []);
  
    return tarefasFiltradas.length > 0 ? tarefasFiltradas : <p>Nenhuma tarefa {finalizadas ? 'finalizada' : 'pendente'}.</p>;
  };
  

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.containerDasTarefas}>
        <h3>Suas tarefas de hoje</h3>
        <div className={styles.listaTarefas}>
          {renderizarTarefas(tarefas, false)}
        </div>

        <h3>Tarefas finalizadas</h3>
        <div className={styles.listaFinalizadas}>
          {renderizarTarefas(tarefas, true)}
        </div>
      </div>

      <button type="button" onClick={abrirModalAdicionarTarefa} className={styles.adicionarTarefa}>
        Adicionar nova tarefa
      </button>

      <ModalAdicionarTarefa
        isOpen={modalAdicionarTarefa}
        onClose={fecharModalAdicionarTarefa}
        onAdd={adicionarTarefa}
        inputTarefa={inputTarefa}
        setInputTarefa={setInputTarefa}
      />

      <ModalRemoverTarefa
        isOpen={modalDeletarAberto}
        onClose={fecharModalDeletarTarefa}
        onRemove={removerTarefa}
      />
    </form>

  );
}
