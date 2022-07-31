import React, { createContext, useContext, useReducer } from 'react';

export const COLUMNS_MAP = {
  toDo: 'To Do',
  inProgress: 'In Progress',
  done: 'Done',
} as const;

export type ColumnsT = keyof typeof COLUMNS_MAP;

export interface TaskT {
  id: number;
  taskText: string;
}

export type StateT = Record<ColumnsT, Array<TaskT>>;

export type ButtonDirectionT = 'next' | 'prev';

export type ActionT =
  | {
      type: 'add';
      taskText: string;
    }
  | {
      type: 'moveTask';
      direction: ButtonDirectionT;
      sourceColumnKey: ColumnsT;
      taskId: number;
    };

let taskIdCounter = 0;

export const tasksReducer = (tasks: StateT, action: ActionT): StateT => {
  switch (action.type) {
    // Add a Task
    case 'add': {
      const { taskText } = action;
      const newTask = {
        id: taskIdCounter++,
        taskText,
      };

      const firstColumnKey = Object.keys(COLUMNS_MAP)[0] as ColumnsT;

      // Reducers are Pure functions: Always return a new object, never mutate the state paramater
      const newState = { ...tasks };
      newState[firstColumnKey] = [...newState[firstColumnKey], newTask];

      return newState;
    }

    // Move a task around
    case 'moveTask': {
      const { direction, taskId, sourceColumnKey } = action;

      const newState = { ...tasks };

      // Find the task that is moving and copy it
      const movedTask = {
        ...tasks[sourceColumnKey].find((t) => t.id === taskId),
      } as TaskT;

      // Calculate destination column
      const columnsEntries = Object.keys(COLUMNS_MAP);
      let destinationColumnKeyIndex = -1;

      if (direction === 'prev') {
        destinationColumnKeyIndex = columnsEntries.indexOf(sourceColumnKey) - 1;
      }

      if (direction === 'next') {
        destinationColumnKeyIndex = columnsEntries.indexOf(sourceColumnKey) + 1;
      }

      if (
        destinationColumnKeyIndex < 0 ||
        destinationColumnKeyIndex >= columnsEntries.length
      ) {
        console.error('Out of Bounds Move');
        return tasks;
      }

      const destinationColumnKey = columnsEntries[
        destinationColumnKeyIndex
      ] as ColumnsT;

      // Add to destination column
      newState[destinationColumnKey] = [
        ...newState[destinationColumnKey],
        movedTask,
      ];

      // Remove from source column
      newState[sourceColumnKey] = newState[sourceColumnKey].filter(
        (t) => t.id !== taskId,
      );

      return newState;
    }

    default: {
      console.error('Unknown action: ' + action['type']);
      return tasks;
    }
  }
};

export const emptyState = { toDo: [], inProgress: [], done: [] };

const TasksContext = createContext<StateT>(emptyState);
const TasksDispatchContext = createContext<React.Dispatch<ActionT> | null>(
  null,
);

const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, dispatch] = useReducer(tasksReducer, emptyState);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
export const useTasksDispatch = () => useContext(TasksDispatchContext);

export default TasksProvider;
