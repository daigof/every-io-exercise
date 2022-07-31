import {
  tasksReducer,
  emptyState,
  ActionT,
  COLUMNS_MAP,
  ColumnsT,
  StateT,
} from '.';

describe('Task reducer tests', () => {
  it('run add action correctly', () => {
    const action: ActionT = {
      type: 'add',
      taskText: 'New task here to test',
    };
    const newState = tasksReducer(emptyState, action);

    const firstColumnKey = Object.keys(COLUMNS_MAP)[0] as ColumnsT;

    expect(newState[firstColumnKey].length).toBe(1);
  });

  it('move a task to another column correctly', () => {
    const initialState: StateT = {
      ...emptyState,
      toDo: [
        {
          id: 1,
          taskText: 'Task title',
        },
      ],
    };

    const action: ActionT = {
      type: 'moveTask',
      direction: 'next',
      sourceColumnKey: 'toDo',
      taskId: 1,
    };

    const newState = tasksReducer(initialState, action);

    expect(newState.toDo.length).toBe(0);
    expect(newState.inProgress.length).toBe(1);
  });

  it('Doesnt allow to move Previous from first column', () => {
    const spiedConsoleError = jest.spyOn(console, 'error');
    spiedConsoleError.mockImplementation(() => {});
    const initialState: StateT = {
      ...emptyState,
      toDo: [
        {
          id: 1,
          taskText: 'Task title',
        },
      ],
    };

    const action: ActionT = {
      type: 'moveTask',
      direction: 'prev',
      sourceColumnKey: 'toDo',
      taskId: 1,
    };

    const newState = tasksReducer(initialState, action);

    expect(newState.toDo.length).toBe(1);
    expect(newState.inProgress.length).toBe(0);
    expect(spiedConsoleError).toHaveBeenCalledTimes(1);

    spiedConsoleError.mockRestore();
  });
});
