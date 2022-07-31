import React, { useState } from 'react';

import { ActionT, useTasksDispatch } from 'context/TasksProvider';

import styles from './styles.module.css';

const AddTaskForm: React.FC = () => {
  const [taskText, setTaskText] = useState('');
  const dispatch = useTasksDispatch();

  if (!dispatch) {
    return null;
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const action: ActionT = {
      type: 'add',
      taskText,
    };
    dispatch(action);
    setTaskText('');
  };

  return (
    <form onSubmit={(e) => onFormSubmit(e)} className={styles.form}>
      {/* <label htmlFor="addTask">New task: </label> */}
      <input
        id="addTask"
        type="text"
        maxLength={150}
        required
        placeholder="Add Task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        +
      </button>
    </form>
  );
};

export default AddTaskForm;
