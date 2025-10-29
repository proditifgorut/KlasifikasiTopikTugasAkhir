import React from 'react';
import { Brain, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Klasifikasi Topik Tugas Akhir
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Menggunakan PSO & K-Nearest Neighbor
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Sistem Cerdas</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
