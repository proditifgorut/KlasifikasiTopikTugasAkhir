import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Plus, Trash2, BarChart3 } from 'lucide-react';
import { getTrainingData } from '../utils/dataset';

const DatasetManager: React.FC = () => {
  const [dataset] = useState(getTrainingData());
  const [showAddForm, setShowAddForm] = useState(false);

  const getCategoryStats = () => {
    const stats: Record<string, number> = {};
    dataset.forEach(item => {
      stats[item.category] = (stats[item.category] || 0) + 1;
    });
    return stats;
  };

  const stats = getCategoryStats();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Dataset Pelatihan</h2>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Tambah Data
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Total Data</span>
            </div>
            <p className="text-3xl font-bold text-blue-700">{dataset.length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Kategori</span>
            </div>
            <p className="text-3xl font-bold text-purple-700">{Object.keys(stats).length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Status</span>
            </div>
            <p className="text-lg font-bold text-green-700">Siap Digunakan</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Distribusi Kategori</h3>
          <div className="space-y-2">
            {Object.entries(stats).map(([category, count]) => (
              <div key={category} className="flex items-center gap-3">
                <div className="w-40 text-sm font-medium text-gray-700">{category}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full flex items-center justify-end px-2 transition-all duration-500"
                    style={{ width: `${(count / dataset.length) * 100}%` }}
                  >
                    <span className="text-xs font-semibold text-white">{count}</span>
                  </div>
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">
                  {((count / dataset.length) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
      >
        <h3 className="font-semibold text-gray-800 mb-4">Data Tugas Akhir</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {dataset.map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-gray-500">#{index + 1}</span>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.abstract}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                      {item.category}
                    </span>
                    {item.keywords.slice(0, 3).map((keyword, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="ml-4 text-red-500 hover:text-red-700 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DatasetManager;
