import React from 'react';
import styles from '../../styles/Tarefa/Modal.module.scss';

interface ModalRemoverTarefaProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}

const ModalRemoverTarefa: React.FC<ModalRemoverTarefaProps> = ({
  isOpen,
  onClose,
  onRemove,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.modalTitles}>
          <h3>Deletar tarefa</h3>
          <span>Tem certeza que você deseja deletar essa tarefa?</span>
        </div>
        <div className={styles.modalActions}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
          <button type="button" onClick={onRemove} className={styles.deleteButton}>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRemoverTarefa;
