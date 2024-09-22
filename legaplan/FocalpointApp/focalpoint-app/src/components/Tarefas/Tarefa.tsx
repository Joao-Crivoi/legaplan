import React from 'react';
import Image from 'next/image';
import TrashIcon from '../../../../public/assets/trashIcon.svg';
import CheckBox from '../../../../public/assets/Checkbox.svg';
import CheckBoxChecked from '../../../../public/assets/checkboxChecked.svg';
import styles from '../../styles/Tarefa/Tarefas.module.scss';

type TarefaProps = {
  tarefa: { nome: string; finalizada: boolean };
  onToggle: () => void;
  onDelete: () => void;
};

const Tarefa: React.FC<TarefaProps> = ({ tarefa, onToggle, onDelete }) => {
  const checkBoxIcon = tarefa.finalizada ? CheckBoxChecked : CheckBox;

  return (
    <div className={styles.tarefa}>
      <Image src={checkBoxIcon} alt="Selecionar Tarefa" onClick={onToggle} />
      <span className={tarefa.finalizada ? styles.riscado : styles.nomeTarefa}>{tarefa.nome}</span>
      <Image src={TrashIcon} alt="Deletar tarefa" onClick={onDelete} />
    </div>
  );
};

export default Tarefa;
