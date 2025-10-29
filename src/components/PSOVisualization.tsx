import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap } from 'lucide-react';

interface Props {
  isActive: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

const PSOVisualization: React.FC<Props> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [iteration, setIteration] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 400,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    if (!isActive) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setIteration(0);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetX = 300;
    const targetY = 200;

    let frame = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, 600, 400);

      ctx.beginPath();
      ctx.arc(targetX, targetY, 15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(234, 179, 8, 0.3)';
      ctx.fill();
      ctx.strokeStyle = 'rgb(234, 179, 8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      setParticles(prevParticles => {
        return prevParticles.map(p => {
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const w = 0.5;
          const c1 = 1.5;
          const c2 = 1.5;

          const newVx = w * p.vx + c1 * Math.random() * (dx / dist) + c2 * Math.random() * (dx / dist);
          const newVy = w * p.vy + c1 * Math.random() * (dy / dist) + c2 * Math.random() * (dy / dist);

          let newX = p.x + newVx;
          let newY = p.y + newVy;

          if (newX < 0 || newX > 600) newX = p.x;
          if (newY < 0 || newY > 400) newY = p.y;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(newX, newY);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.3;
          ctx.stroke();
          ctx.globalAlpha = 1;

          return { ...p, x: newX, y: newY, vx: newVx, vy: newVy };
        });
      });

      frame++;
      if (frame % 20 === 0) {
        setIteration(prev => Math.min(prev + 1, 100));
      }

      if (isActive) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg">
          <Activity className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Visualisasi PSO</h2>
      </div>

      <div className="bg-slate-900 rounded-xl overflow-hidden mb-4 relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full h-auto"
        />
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <p className="text-white font-semibold">Menunggu klasifikasi...</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Iterasi</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{iteration}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Partikel</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">20</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Tentang PSO</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Particle Swarm Optimization (PSO) digunakan untuk optimasi pemilihan fitur 
          pada dataset tugas akhir, membantu meningkatkan akurasi klasifikasi KNN.
        </p>
      </div>
    </motion.div>
  );
};

export default PSOVisualization;
