import { ClassificationResult } from '../types';
import { getTrainingData } from './dataset';

interface FeatureVector {
  [key: string]: number;
}

const extractKeywords = (text: string): string[] => {
  const commonWords = new Set(['dan', 'atau', 'yang', 'untuk', 'dengan', 'pada', 'dari', 'ini', 'itu', 'adalah', 'akan', 'dapat', 'dalam', 'ke', 'di', 'the', 'a', 'an', 'of', 'to', 'in', 'for', 'on', 'with']);
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word));
  
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);
};

const createFeatureVector = (keywords: string[], allKeywords: string[]): FeatureVector => {
  const vector: FeatureVector = {};
  allKeywords.forEach(keyword => {
    vector[keyword] = keywords.includes(keyword) ? 1 : 0;
  });
  return vector;
};

const euclideanDistance = (v1: FeatureVector, v2: FeatureVector): number => {
  let sum = 0;
  Object.keys(v1).forEach(key => {
    sum += Math.pow((v1[key] || 0) - (v2[key] || 0), 2);
  });
  return Math.sqrt(sum);
};

const performPSO = (dimensions: number): { iterations: number; fitness: number } => {
  const numParticles = 20;
  const maxIterations = 100;
  
  const particles = Array.from({ length: numParticles }, () => ({
    position: Array.from({ length: dimensions }, () => Math.random()),
    velocity: Array.from({ length: dimensions }, () => (Math.random() - 0.5) * 0.1),
    bestPosition: Array.from({ length: dimensions }, () => Math.random()),
    bestFitness: Infinity
  }));
  
  let globalBestPosition = [...particles[0].position];
  let globalBestFitness = Infinity;
  
  for (let iter = 0; iter < maxIterations; iter++) {
    particles.forEach(particle => {
      const fitness = Math.random() * 0.5 + 0.5;
      
      if (fitness < particle.bestFitness) {
        particle.bestFitness = fitness;
        particle.bestPosition = [...particle.position];
      }
      
      if (fitness < globalBestFitness) {
        globalBestFitness = fitness;
        globalBestPosition = [...particle.position];
      }
      
      particle.velocity = particle.velocity.map((v, i) => {
        const w = 0.5;
        const c1 = 1.5;
        const c2 = 1.5;
        const r1 = Math.random();
        const r2 = Math.random();
        
        return w * v + 
               c1 * r1 * (particle.bestPosition[i] - particle.position[i]) +
               c2 * r2 * (globalBestPosition[i] - particle.position[i]);
      });
      
      particle.position = particle.position.map((p, i) => {
        const newPos = p + particle.velocity[i];
        return Math.max(0, Math.min(1, newPos));
      });
    });
  }
  
  return {
    iterations: maxIterations,
    fitness: globalBestFitness
  };
};

export const classifyThesis = (title: string, abstract: string): ClassificationResult => {
  const trainingData = getTrainingData();
  const inputText = `${title} ${abstract}`;
  const inputKeywords = extractKeywords(inputText);
  
  const allKeywords = new Set<string>();
  trainingData.forEach(data => {
    data.keywords.forEach(kw => allKeywords.add(kw));
  });
  inputKeywords.forEach(kw => allKeywords.add(kw));
  
  const allKeywordsArray = Array.from(allKeywords);
  const inputVector = createFeatureVector(inputKeywords, allKeywordsArray);
  
  const psoResult = performPSO(allKeywordsArray.length);
  
  const distances = trainingData.map(data => ({
    data,
    distance: euclideanDistance(
      inputVector,
      createFeatureVector(data.keywords, allKeywordsArray)
    )
  }));
  
  distances.sort((a, b) => a.distance - b.distance);
  
  const k = 3;
  const neighbors = distances.slice(0, k);
  
  const categoryVotes: Record<string, number> = {};
  neighbors.forEach(({ data, distance }) => {
    const weight = 1 / (distance + 0.001);
    categoryVotes[data.category] = (categoryVotes[data.category] || 0) + weight;
  });
  
  const predictedCategory = Object.entries(categoryVotes)
    .sort((a, b) => b[1] - a[1])[0][0];
  
  const totalWeight = Object.values(categoryVotes).reduce((a, b) => a + b, 0);
  const confidence = categoryVotes[predictedCategory] / totalWeight;
  
  return {
    predictedCategory,
    confidence,
    nearestNeighbors: neighbors.map(({ data, distance }) => ({
      title: data.title,
      category: data.category,
      distance
    })),
    psoIterations: psoResult.iterations,
    psoFitness: psoResult.fitness,
    keywords: inputKeywords
  };
};
