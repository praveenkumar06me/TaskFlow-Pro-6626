import React from 'react';
import { useTasks } from '../context/TaskContext';
import { FiCheckCircle, FiClock, FiList } from 'react-icons/fi';

const Dashboard = () => {
  const { tasks } = useTasks();

  const stats = [
    {
      icon: FiList,
      label: 'To Do',
      count: tasks.todo.length,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: FiClock,
      label: 'In Progress',
      count: tasks.inProgress.length,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: FiCheckCircle,
      label: 'Completed',
      count: tasks.done.length,
      color: 'bg-green-100 text-green-600',
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-secondary mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface rounded-lg p-6 shadow-sm"
          >
            <div className={`inline-block p-3 rounded-full ${stat.color} mb-4`}>
              <stat.icon size={24} />
            </div>
            <h3 className="text-xl font-semibold text-secondary">{stat.label}</h3>
            <p className="text-3xl font-bold mt-2">{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-secondary mb-4">Recent Tasks</h2>
        <div className="bg-surface rounded-lg shadow-sm">
          {tasks.todo.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className="p-4 border-b last:border-b-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-secondary">{task.title}</h4>
                  <p className="text-sm text-gray-500">Assigned to {task.assignee}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  task.priority === 'high' ? 'bg-red-100 text-red-600' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {task.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;