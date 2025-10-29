import { ThesisData } from '../types';

export const trainingData: ThesisData[] = [
  {
    id: '1',
    title: 'Implementasi Deep Learning untuk Deteksi Objek Real-time',
    abstract: 'Penelitian ini mengembangkan sistem deteksi objek menggunakan YOLO dan CNN untuk aplikasi real-time. Menggunakan dataset COCO dan transfer learning untuk meningkatkan akurasi deteksi.',
    keywords: ['deep learning', 'yolo', 'cnn', 'deteksi objek', 'computer vision', 'neural network'],
    category: 'Computer Vision'
  },
  {
    id: '2',
    title: 'Sistem Rekomendasi Film dengan Collaborative Filtering',
    abstract: 'Membangun sistem rekomendasi menggunakan algoritma collaborative filtering dan matrix factorization. Implementasi menggunakan Python dan library scikit-learn dengan dataset MovieLens.',
    keywords: ['machine learning', 'collaborative filtering', 'recommendation system', 'python', 'matrix factorization'],
    category: 'Machine Learning'
  },
  {
    id: '3',
    title: 'Aplikasi E-Commerce Berbasis Progressive Web App',
    abstract: 'Pengembangan aplikasi e-commerce menggunakan React dan service workers untuk fitur offline-first. Implementasi payment gateway dan real-time inventory management.',
    keywords: ['react', 'pwa', 'web development', 'javascript', 'service worker', 'e-commerce'],
    category: 'Web Development'
  },
  {
    id: '4',
    title: 'Analisis Sentimen Media Sosial dengan LSTM',
    abstract: 'Penelitian analisis sentimen pada data Twitter menggunakan Long Short-Term Memory networks. Preprocessing data dengan tokenization dan word embedding menggunakan Word2Vec.',
    keywords: ['nlp', 'lstm', 'sentiment analysis', 'deep learning', 'twitter', 'word2vec'],
    category: 'Natural Language Processing'
  },
  {
    id: '5',
    title: 'Aplikasi Mobile Kesehatan dengan Flutter',
    abstract: 'Pengembangan aplikasi mobile untuk monitoring kesehatan menggunakan Flutter. Integrasi dengan wearable devices dan cloud storage untuk data pasien.',
    keywords: ['flutter', 'mobile development', 'dart', 'health app', 'firebase', 'cross-platform'],
    category: 'Mobile Development'
  },
  {
    id: '6',
    title: 'Prediksi Harga Saham Menggunakan Time Series Analysis',
    abstract: 'Implementasi ARIMA dan Prophet untuk memprediksi pergerakan harga saham. Analisis data historis dan visualisasi dengan Python libraries.',
    keywords: ['time series', 'arima', 'prophet', 'data science', 'stock prediction', 'python'],
    category: 'Data Science'
  },
  {
    id: '7',
    title: 'Chatbot Customer Service dengan Natural Language Understanding',
    abstract: 'Membangun chatbot intelligent menggunakan BERT dan transformer models. Implementasi intent classification dan entity recognition untuk customer service.',
    keywords: ['nlp', 'bert', 'chatbot', 'transformer', 'intent classification', 'nlu'],
    category: 'Natural Language Processing'
  },
  {
    id: '8',
    title: 'Sistem Pengenalan Wajah untuk Absensi',
    abstract: 'Pengembangan sistem absensi otomatis menggunakan face recognition dengan OpenCV dan dlib. Implementasi liveness detection untuk keamanan.',
    keywords: ['computer vision', 'face recognition', 'opencv', 'dlib', 'biometric', 'deep learning'],
    category: 'Computer Vision'
  },
  {
    id: '9',
    title: 'Dashboard Analytics dengan React dan D3.js',
    abstract: 'Pembuatan dashboard interaktif untuk visualisasi data bisnis. Menggunakan React untuk UI dan D3.js untuk visualisasi data yang kompleks.',
    keywords: ['react', 'd3js', 'data visualization', 'dashboard', 'web development', 'javascript'],
    category: 'Web Development'
  },
  {
    id: '10',
    title: 'Klasifikasi Penyakit Tanaman dengan CNN',
    abstract: 'Sistem klasifikasi penyakit pada daun tanaman menggunakan Convolutional Neural Networks. Training menggunakan augmentasi data dan transfer learning dengan MobileNet.',
    keywords: ['cnn', 'image classification', 'deep learning', 'transfer learning', 'mobilenet', 'agriculture'],
    category: 'Machine Learning'
  },
  {
    id: '11',
    title: 'Aplikasi Tracking Fitness dengan React Native',
    abstract: 'Pengembangan aplikasi fitness tracking menggunakan React Native. Integrasi dengan GPS, pedometer, dan database cloud untuk menyimpan aktivitas pengguna.',
    keywords: ['react native', 'mobile development', 'fitness', 'gps', 'health tracking', 'javascript'],
    category: 'Mobile Development'
  },
  {
    id: '12',
    title: 'Big Data Analytics untuk Pola Pembelian Pelanggan',
    abstract: 'Analisis pola pembelian menggunakan Apache Spark dan Hadoop. Implementasi clustering dan association rule mining untuk business intelligence.',
    keywords: ['big data', 'spark', 'hadoop', 'data science', 'clustering', 'data analytics'],
    category: 'Data Science'
  },
  {
    id: '13',
    title: 'Object Tracking dalam Video dengan Kalman Filter',
    abstract: 'Implementasi algoritma tracking objek bergerak dalam video menggunakan Kalman Filter dan optical flow. Aplikasi untuk surveillance system.',
    keywords: ['computer vision', 'object tracking', 'kalman filter', 'video processing', 'opencv', 'surveillance'],
    category: 'Computer Vision'
  },
  {
    id: '14',
    title: 'Question Answering System dengan BERT',
    abstract: 'Membangun sistem tanya jawab otomatis menggunakan pre-trained BERT model. Fine-tuning dengan dataset SQuAD untuk bahasa Indonesia.',
    keywords: ['nlp', 'bert', 'question answering', 'transformer', 'deep learning', 'squad'],
    category: 'Natural Language Processing'
  },
  {
    id: '15',
    title: 'Microservices Architecture dengan Node.js dan Docker',
    abstract: 'Implementasi arsitektur microservices untuk aplikasi e-commerce. Menggunakan Node.js, Docker, dan Kubernetes untuk orchestration.',
    keywords: ['nodejs', 'microservices', 'docker', 'kubernetes', 'web development', 'api'],
    category: 'Web Development'
  }
];

export const getTrainingData = (): ThesisData[] => {
  return trainingData;
};

export const addTrainingData = (data: ThesisData): void => {
  trainingData.push(data);
};
