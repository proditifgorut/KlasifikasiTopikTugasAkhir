import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { classifyThesis } from '../utils/classification';
import { ClassificationResult } from '../types';

interface Props {
  onClassify: (result: ClassificationResult) => void;
  onProcessingChange: (processing: boolean) => void;
}

const ClassificationForm: React.FC<Props> = ({ onClassify, onProcessingChange }) => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !abstract.trim()) {
      alert('Mohon isi judul dan abstrak');
      return;
    }

    setIsLoading(true);
    onProcessingChange(true);

    setTimeout(() => {
      const result = classifyThesis(title, abstract);
      onClassify(result);
      setIsLoading(false);
      onProcessingChange(false);
    }, 2500);
  };

  const handleExample = () => {
    setTitle('Implementasi Machine Learning untuk Prediksi Cuaca');
    setAbstract('Penelitian ini membahas tentang penggunaan algoritma machine learning untuk memprediksi kondisi cuaca. Menggunakan data historis cuaca dan teknik deep learning, sistem dapat memprediksi cuaca dengan akurasi tinggi. Neural network dan random forest digunakan sebagai model prediksi utama.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Sparkles className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Input Data Tugas Akhir</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Judul Tugas Akhir
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="Masukkan judul tugas akhir..."
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="abstract" className="block text-sm font-semibold text-gray-700 mb-2">
            Abstrak
          </label>
          <textarea
            id="abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
            placeholder="Masukkan abstrak tugas akhir..."
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Klasifikasi
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleExample}
            disabled={isLoading}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Contoh
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ClassificationForm;
