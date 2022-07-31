import React from 'react';

import TaskColumn from 'components/challengeBoard/taskColumn';
import AddTaskForm from 'components/challengeBoard/addTaskForm';
import { ColumnsT, COLUMNS_MAP } from 'context/TasksProvider';

import styles from './styles.module.css';

const ChallengeBoard = () => (
  <section className={styles.mainWrapper}>
    {/* COLUMNS SECTION */}
    <div className={styles.columnsWrapper}>
      {Object.keys(COLUMNS_MAP).map((columnKey) => (
        <TaskColumn key={columnKey} columnKey={columnKey as ColumnsT} />
      ))}
    </div>

    {/* ADD FIELD FORM */}
    <AddTaskForm />
  </section>
);

export default ChallengeBoard;
