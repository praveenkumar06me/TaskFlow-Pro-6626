import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import { FiPlus, FiChevronRight } from 'react-icons/fi';

function Backlog() {
  const { tasks, sprints, moveTaskToSprint, addSprint } = useTasks();
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [showSprintModal, setShowSprintModal] = useState(false);
  const [newSprint, setNewSprint] = useState({
    name: '',
    startDate: '',
    endDate: '',
    status: 'planned'
  });

  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleMoveToSprint = (sprintId) => {
    selectedTasks.forEach(taskId => {
      moveTaskToSprint(taskId, sprintId);
    });
    setSelectedTasks(new Set());
  };

  const handleCreateSprint = (e) => {
    e.preventDefault();
    addSprint(newSprint);
    setShowSprintModal(false);
    setNewSprint({
      name: '',
      startDate: '',
      endDate: '',
      status: 'planned'
    });
  };

  return (
    <div className="p-8 h-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-secondary">Backlog</h1>
        <button
          onClick={() => setShowSprintModal(true)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" />
          Create Sprint
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Product Backlog</h2>
            <div className="space-y-3">
              {tasks.backlog.map(task => (
                <motion.div
                  key={task.id}
                  layout
                  className={`p-4 rounded-lg border ${
                    selectedTasks.has(task.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTasks.has(task.id)}
                      onChange={() => handleTaskSelect(task.id)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          task.priority === 'high' ? 'bg-red-100 text-red-600' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="mr-4">Assignee: {task.assignee}</span>
                        <span>Estimate: {task.estimate} points</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sprints</h2>
          <div className="space-y-4">
            {sprints.map(sprint => (
              <div
                key={sprint.id}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{sprint.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    sprint.status === 'active' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {sprint.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                </div>
                {selectedTasks.size > 0 && (
                  <button
                    onClick={() => handleMoveToSprint(sprint.id)}
                    className="w-full mt-2 py-2 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-sm"
                  >
                    Move selected here
                    <FiChevronRight className="ml-1" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showSprintModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-lg w-96"
          >
            <h2 className="text-xl font-semibold mb-4">Create New Sprint</h2>
            <form onSubmit={handleCreateSprint}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Sprint Name</label>
                  <input
                    type="text"
                    value={newSprint.name}
                    onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newSprint.startDate}
                    onChange={(e) => setNewSprint({ ...newSprint, startDate: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={newSprint.endDate}
                    onChange={(e) => setNewSprint({ ...newSprint, endDate: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowSprintModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded"
                >
                  Create Sprint
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Backlog;