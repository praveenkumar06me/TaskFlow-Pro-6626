import React from 'react';
import { motion } from 'framer-motion';
import TaskCard from './TaskCard';

const KanbanColumn = ({ title, tasks, columnId, onDrop }) => {
  const columnColors = {
    todo: 'border-blue-200 bg-blue-50',
    inProgress: 'border-yellow-200 bg-yellow-50',
    done: 'border-green-200 bg-green-50'
  };

  return (
    <div
      className={`flex flex-col h-full rounded-lg p-4 ${columnColors[columnId]} border-2`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="bg-white px-2 py-1 rounded-full text-sm">
          {tasks.length}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <motion.div layout className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} columnId={columnId} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default KanbanColumn;