import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ClassificationForm from './components/ClassificationForm';
import PSOVisualization from './components/PSOVisualization';
import ResultsPanel from './components/ResultsPanel';
import DatasetManager from './components/DatasetManager';
import { ClassificationResult } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'classify' | 'dataset'>('classify');
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClassification = (result: ClassificationResult) => {
    setClassificationResult(result);
  };

  const handleProcessingChange = (processing: boolean) => {
    setIsProcessing(processing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <div className="flex gap-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('classify')}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === 'classify'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Klasifikasi
              </button>
              <button
                onClick={() => setActiveTab('dataset')}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === 'dataset'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Kelola Dataset
              </button>
            </div>
          </div>

          {activeTab === 'classify' ? (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <ClassificationForm
                  onClassify={handleClassification}
                  onProcessingChange={handleProcessingChange}
                />
                {classificationResult && (
                  <ResultsPanel result={classificationResult} />
                )}
              </div>

              <div>
                <PSOVisualization isActive={isProcessing} />
              </div>
            </div>
          ) : (
            <DatasetManager />
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default App;
