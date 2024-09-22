import React from 'react';
import styles from '../../styles/Tarefa/Modal.module.scss';

interface ModalAdicionarTarefaProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (tarefa: string) => void;
  inputTarefa: string;
  setInputTarefa: (tarefa: string) => void;
}

const ModalAdicionarTarefa: React.FC<ModalAdicionarTarefaProps> = ({
  isOpen,
  onClose,
  onAdd,
  inputTarefa,
  setInputTarefa,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.modalTitles}>
          <h3>Nova tarefa</h3>
          <h4>Título</h4>
        </div>

        <input
          type="text"
          value={inputTarefa}
          onChange={(e) => setInputTarefa(e.target.value)}
          placeholder="Digite"
        />
        <div className={styles.modalActions}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
          <button type="button" onClick={() => onAdd(inputTarefa)} className={styles.addButton}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdicionarTarefa;
