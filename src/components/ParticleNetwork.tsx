import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  life?: number;
  decay?: number;
  dead?: boolean;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const G = 0.8; // Gravitational constant (Increased for faster attraction)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particles.length === 0) {
        initParticles();
      }
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 70; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.0,
          vy: (Math.random() - 0.5) * 1.0,
          mass: Math.random() * 2 + 0.5, // Base mass 0.5 to 2.5
        });
      }
    };

    let lastSpawnTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawnTime > 30) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2.0,
          vy: (Math.random() - 0.5) * 2.0,
          mass: Math.random() * 0.5 + 0.1, // Small context particles
          life: 1.0,
          decay: 0.001 + Math.random() * 0.002 // Long life so they get eaten
        });
        lastSpawnTime = now;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Decay life
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.life !== undefined) {
          p.life -= p.decay!;
          if (p.life <= 0) p.dead = true;
        }
      }

      // Filter out naturally dead particles before physics
      particles = particles.filter(p => !p.dead);

      // 2. N-Body Gravity
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          // Force = G * (m1 * m2) / r^2
          // We soften the distance to prevent infinite forces when very close
          const softenedDistSq = Math.max(distSq, 150);
          const force = (G * p1.mass * p2.mass) / softenedDistSq;

          // a = F / m
          const ax1 = (force * dx / dist) / p1.mass;
          const ay1 = (force * dy / dist) / p1.mass;
          const ax2 = -(force * dx / dist) / p2.mass;
          const ay2 = -(force * dy / dist) / p2.mass;

          p1.vx += ax1;
          p1.vy += ay1;
          p2.vx += ax2;
          p2.vy += ay2;
        }
      }

      // 3. Merging and Physics Updates
      const newMergedParticles: Particle[] = [];
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (p1.dead) continue;

        const r1 = Math.sqrt(p1.mass) * 2.5; // Visually bigger particles

        // Check for merges
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p2.dead) continue;

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const r2 = Math.sqrt(p2.mass) * 2.5; // Visually bigger particles

          // If they touch, they merge!
          if (dist < r1 + r2) {
            p1.dead = true;
            p2.dead = true;

            const newMass = p1.mass + p2.mass;
            const isPermanent = p1.life === undefined || p2.life === undefined;

            newMergedParticles.push({
              x: (p1.x * p1.mass + p2.x * p2.mass) / newMass,
              y: (p1.y * p1.mass + p2.y * p2.mass) / newMass,
              // Conservation of momentum
              vx: (p1.vx * p1.mass + p2.vx * p2.mass) / newMass,
              vy: (p1.vy * p1.mass + p2.vy * p2.mass) / newMass,
              mass: Math.min(newMass, 200), // Cap max mass so it doesn't become a black hole that crashes the browser
              life: isPermanent ? undefined : Math.max(p1.life || 0, p2.life || 0),
              decay: Math.min(p1.decay || 0.01, p2.decay || 0.01)
            });
            break; // p1 is dead, break inner loop
          }
        }

        if (p1.dead) continue;

        // Apply friction
        p1.vx *= 0.99;
        p1.vy *= 0.99;

        // Cap speed
        const speed = Math.sqrt(p1.vx * p1.vx + p1.vy * p1.vy);
        const maxSpeed = p1.life !== undefined ? 3.0 : 1.5; // Mouse particles can move faster
        if (speed > maxSpeed) {
          p1.vx = (p1.vx / speed) * maxSpeed;
          p1.vy = (p1.vy / speed) * maxSpeed;
        }

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce off walls (with slight dampening)
        if (p1.x < 0 || p1.x > canvas.width) {
          p1.vx *= -0.8;
          p1.x = Math.max(0, Math.min(canvas.width, p1.x));
        }
        if (p1.y < 0 || p1.y > canvas.height) {
          p1.vy *= -0.8;
          p1.y = Math.max(0, Math.min(canvas.height, p1.y));
        }
      }

      // Add newly merged particles and remove dead ones
      particles = particles.filter(p => !p.dead).concat(newMergedParticles);

      // --- DRAWING ---

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const r1 = Math.sqrt(p1.mass) * 2.5;
        const opacityMult = p1.life !== undefined ? Math.max(0, p1.life) : 1;

        // Draw Particle
        ctx.fillStyle = `rgba(2, 132, 199, ${0.2 * opacityMult})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, r1, 0, Math.PI * 2);
        ctx.fill();

        // Draw Neural Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Connection distance scales slightly with the size of the particles
          // Massive particles can form connections from further away
          const connectionDistance = 100 + (Math.sqrt(p1.mass) + Math.sqrt(p2.mass)) * 5;

          if (dist < connectionDistance) {
            const p2OpacityMult = p2.life !== undefined ? Math.max(0, p2.life) : 1;
            let opacity = (1 - (dist / connectionDistance)) * opacityMult * p2OpacityMult;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(2, 132, 199, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
