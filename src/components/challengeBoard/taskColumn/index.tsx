import React from 'react';

import {
  ActionT,
  ButtonDirectionT,
  ColumnsT,
  COLUMNS_MAP,
  useTasks,
  useTasksDispatch,
} from 'context/TasksProvider';

import styles from './styles.module.css';
import TaskCard from './taskCard';

interface TaskColumnProps {
  columnKey: ColumnsT;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ columnKey }) => {
  const { [columnKey]: columnTasks } = useTasks();
  const dispatch = useTasksDispatch();

  if (!dispatch) {
    return null;
  }

  const columnName = COLUMNS_MAP[columnKey];

  const handleTaskMove = (direction: ButtonDirectionT, taskId: number) => {
    const action: ActionT = {
      type: 'moveTask',
      direction,
      sourceColumnKey: columnKey,
      taskId,
    };
    dispatch(action);
  };

  const columnsEntries = Object.keys(COLUMNS_MAP);

  return (
    <div className={styles.mainWrapper}>
      <h2>{columnName}</h2>
      <div>
        {columnTasks.map((task) => (
          <TaskCard
            key={task.id}
            taskText={task.taskText}
            isPrevBtnDisabled={columnKey === columnsEntries[0]}
            isNextBtnDisabled={
              columnKey === columnsEntries[columnsEntries.length - 1]
            }
            handleTaskMove={(direction) => handleTaskMove(direction, task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
