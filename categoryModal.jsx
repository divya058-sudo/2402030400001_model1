import React from "react";
import { Link } from "react-router-dom";

function CategoryModal({ open, onClose, categories = [] }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 p-6 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Explore Categories</h2>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {categories.map((c, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="text-4xl">{c.icon}</div>
              <h3 className="text-xl font-bold mt-2">{c.title}</h3>
              <p className="text-gray-600 mt-2">{c.description}</p>

              <div className="mt-4 flex gap-2">
                <Link to={c.path} onClick={onClose} className="no-underline">
                  <button className="bg-blue-600 text-white px-3 py-2 rounded">View Experiments</button>
                </Link>

                <Link to={c.path} onClick={onClose} className="no-underline">
                  <button className="border px-3 py-2 rounded">Start</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
