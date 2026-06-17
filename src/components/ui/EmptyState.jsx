import React from 'react';

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-gray-200 border-dashed min-h-[300px]">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Icon size={48} className="text-gray-400" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
