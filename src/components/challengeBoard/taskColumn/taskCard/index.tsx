import React from 'react';

import { ButtonDirectionT } from 'context/TasksProvider';

import styles from './styles.module.css';

interface TaskCardProps {
  taskText: string;
  isPrevBtnDisabled: boolean;
  isNextBtnDisabled: boolean;
  handleTaskMove: (direction: ButtonDirectionT) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  taskText,
  isPrevBtnDisabled,
  isNextBtnDisabled,
  handleTaskMove,
}) => {
  return (
    <div className={styles.cardWrapper}>
      <button
        disabled={isPrevBtnDisabled}
        type="button"
        onClick={() => handleTaskMove('prev')}
      >
        &lt;
      </button>
      <div className={styles.cardText}>{taskText}</div>
      <button
        disabled={isNextBtnDisabled}
        type="button"
        onClick={() => handleTaskMove('next')}
      >
        &gt;
      </button>
    </div>
  );
};

export default TaskCard;
