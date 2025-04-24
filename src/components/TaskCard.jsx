import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const TaskCard = ({ task, columnId }) => {
  const priorityConfig = {
    high: {
      icon: FiAlertCircle,
      class: 'bg-red-100 text-red-600',
      label: 'High'
    },
    medium: {
      icon: FiClock,
      class: 'bg-yellow-100 text-yellow-600',
      label: 'Medium'
    },
    low: {
      icon: FiCheckCircle,
      class: 'bg-green-100 text-green-600',
      label: 'Low'
    }
  };

  const Priority = priorityConfig[task.priority].icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task.id);
        e.dataTransfer.setData('sourceColumn', columnId);
      }}
      className="bg-white p-4 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        <div className={`p-1 rounded-full ${priorityConfig[task.priority].class}`}>
          <Priority size={16} />
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex items-center mt-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
            {task.assignee.charAt(0)}
          </div>
          <span className="ml-2 text-sm text-gray-600">{task.assignee}</span>
        </div>
      </div>

      {task.dueDate && (
        <div className="mt-2 text-sm text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;