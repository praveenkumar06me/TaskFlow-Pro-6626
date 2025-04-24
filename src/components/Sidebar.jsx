import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiLayout, FiList } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/board', icon: FiLayout, label: 'Board' },
    { path: '/backlog', icon: FiList, label: 'Backlog' }
  ];

  return (
    <div className="w-64 bg-surface border-r border-gray-200 p-4">
      <div className="text-2xl font-bold text-primary mb-8">TaskFlow</div>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 mb-2 rounded-lg ${
              location.pathname === item.path
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;