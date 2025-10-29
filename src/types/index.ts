export interface ThesisData {
  id: string;
  title: string;
  abstract: string;
  keywords: string[];
  category: string;
}

export interface ClassificationResult {
  predictedCategory: string;
  confidence: number;
  nearestNeighbors: Array<{
    title: string;
    category: string;
    distance: number;
  }>;
  psoIterations: number;
  psoFitness: number;
  keywords: string[];
}

export interface Particle {
  position: number[];
  velocity: number[];
  bestPosition: number[];
  bestFitness: number;
}

export interface PSOConfig {
  numParticles: number;
  numIterations: number;
  w: number;
  c1: number;
  c2: number;
}

export interface KNNConfig {
  k: number;
  distanceMetric: 'euclidean' | 'cosine';
}
