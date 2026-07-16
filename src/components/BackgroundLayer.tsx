import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ParticleNetwork from './ParticleNetwork';

export default function BackgroundLayer() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the mouse position
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax mappings for different layers (moves opposite to mouse)
  const bg1X = useTransform(springX, (val) => (val - window.innerWidth / 2) * -0.05);
  const bg1Y = useTransform(springY, (val) => (val - window.innerHeight / 2) * -0.05);
  
  const bg2X = useTransform(springX, (val) => (val - window.innerWidth / 2) * 0.08);
  const bg2Y = useTransform(springY, (val) => (val - window.innerHeight / 2) * 0.08);

  return (
    <div className="background-layer" style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden', backgroundColor: 'var(--bg-color)' }}>
      
      {/* Ambient Shape 1 */}
      <motion.div style={{ position: 'absolute', inset: 0, x: bg1X, y: bg1Y }}>
        <div 
          className="ambient-shape-1"
          style={{
            position: 'absolute',
            top: '-10%', left: '-10%',
            width: '70vw', height: '70vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(243, 128, 32, 0.07) 0%, rgba(243, 128, 32, 0) 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* Ambient Shape 2 */}
      <motion.div style={{ position: 'absolute', inset: 0, x: bg2X, y: bg2Y }}>
        <div 
          className="ambient-shape-2"
          style={{
            position: 'absolute',
            bottom: '-20%', right: '-10%',
            width: '80vw', height: '60vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249, 168, 37, 0.06) 0%, rgba(249, 168, 37, 0) 70%)',
            filter: 'blur(100px)',
          }}
        />
      </motion.div>

      {/* Traveling Data Pulses (Organic) */}
      <ParticleNetwork />

      {/* Texture Grain Overlay */}
      <div 
        className="texture-overlay"
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none',
          opacity: 0.7,
          mixBlendMode: 'multiply',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
