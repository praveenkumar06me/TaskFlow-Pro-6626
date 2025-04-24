import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [sprints, setSprints] = useState([
    {
      id: 'sprint-1',
      name: 'Sprint 1',
      startDate: '2024-03-20',
      endDate: '2024-04-02',
      status: 'active',
      tasks: ['1', '2']
    },
    {
      id: 'sprint-2',
      name: 'Sprint 2',
      startDate: '2024-04-03',
      endDate: '2024-04-16',
      status: 'planned',
      tasks: ['3']
    }
  ]);

  const [tasks, setTasks] = useState({
    backlog: [
      {
        id: '5',
        title: 'Implement user settings',
        priority: 'medium',
        assignee: 'Alice Cooper',
        estimate: '5',
        type: 'feature',
        dueDate: '2024-04-20'
      },
      {
        id: '6',
        title: 'Fix navigation bug',
        priority: 'high',
        assignee: 'Bob Wilson',
        estimate: '3',
        type: 'bug',
        dueDate: '2024-04-15'
      }
    ],
    todo: [
      {
        id: '1',
        title: 'Research competitors',
        priority: 'high',
        assignee: 'John Doe',
        estimate: '8',
        type: 'research',
        dueDate: '2024-03-25'
      },
      {
        id: '2',
        title: 'Design new landing page',
        priority: 'medium',
        assignee: 'Jane Smith',
        estimate: '5',
        type: 'design',
        dueDate: '2024-03-28'
      }
    ],
    inProgress: [
      {
        id: '3',
        title: 'Implement authentication',
        priority: 'high',
        assignee: 'Mike Johnson',
        estimate: '13',
        type: 'feature',
        dueDate: '2024-03-30'
      }
    ],
    done: [
      {
        id: '4',
        title: 'Setup project repository',
        priority: 'low',
        assignee: 'Sarah Wilson',
        estimate: '2',
        type: 'task',
        dueDate: '2024-03-20'
      }
    ]
  });

  const moveTask = (taskId, source, destination) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      const taskToMove = newTasks[source].find(task => task.id === taskId);
      
      if (!taskToMove) return prev;
      
      newTasks[source] = newTasks[source].filter(task => task.id !== taskId);
      newTasks[destination] = [...newTasks[destination], taskToMove];
      
      return newTasks;
    });
  };

  const addTask = (newTask) => {
    setTasks(prev => ({
      ...prev,
      backlog: [...prev.backlog, { ...newTask, id: Date.now().toString() }],
    }));
  };

  const addSprint = (newSprint) => {
    setSprints(prev => [...prev, { ...newSprint, id: `sprint-${prev.length + 1}`, tasks: [] }]);
  };

  const moveTaskToSprint = (taskId, sprintId) => {
    setSprints(prev => {
      return prev.map(sprint => {
        if (sprint.id === sprintId) {
          return { ...sprint, tasks: [...sprint.tasks, taskId] };
        }
        return sprint;
      });
    });
  };

  const updateSprintStatus = (sprintId, status) => {
    setSprints(prev => {
      return prev.map(sprint => {
        if (sprint.id === sprintId) {
          return { ...sprint, status };
        }
        return sprint;
      });
    });
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      sprints,
      moveTask,
      addTask,
      addSprint,
      moveTaskToSprint,
      updateSprintStatus
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}