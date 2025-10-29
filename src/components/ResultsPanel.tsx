import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, Hash } from 'lucide-react';
import { ClassificationResult } from '../types';

interface Props {
  result: ClassificationResult;
}

const ResultsPanel: React.FC<Props> = ({ result }) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Machine Learning': 'bg-blue-100 text-blue-700 border-blue-300',
      'Web Development': 'bg-green-100 text-green-700 border-green-300',
      'Mobile Development': 'bg-purple-100 text-purple-700 border-purple-300',
      'Data Science': 'bg-orange-100 text-orange-700 border-orange-300',
      'Computer Vision': 'bg-pink-100 text-pink-700 border-pink-300',
      'Natural Language Processing': 'bg-indigo-100 text-indigo-700 border-indigo-300',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-2 rounded-lg">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Hasil Klasifikasi</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
          <p className="text-sm font-medium text-gray-600 mb-2">Kategori Terdeteksi</p>
          <div className={`inline-block px-4 py-2 rounded-lg font-bold text-lg border-2 ${getCategoryColor(result.predictedCategory)}`}>
            {result.predictedCategory}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Tingkat Kepercayaan:</span>
            <span className="text-lg font-bold text-green-700">{(result.confidence * 100).toFixed(1)}%</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Kata Kunci Terdeteksi</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">K-Nearest Neighbors (Top 3)</h3>
          </div>
          <div className="space-y-3">
            {result.nearestNeighbors.map((neighbor, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800 flex-1">{neighbor.title}</h4>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded ml-2">
                    #{index + 1}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(neighbor.category)}`}>
                    {neighbor.category}
                  </span>
                  <span className="text-gray-600">
                    Jarak: <span className="font-semibold">{neighbor.distance.toFixed(3)}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Iterasi PSO</p>
            <p className="text-2xl font-bold text-purple-600">{result.psoIterations}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Fitness PSO</p>
            <p className="text-2xl font-bold text-purple-600">{result.psoFitness.toFixed(4)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsPanel;
