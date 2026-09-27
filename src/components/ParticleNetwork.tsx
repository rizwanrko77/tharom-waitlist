import { useEffect, useRef } from 'react';

// AI and experts, working together: grey AI nodes do the routine work, a few
// orange expert nodes are the people in the loop, and signals travel between them.

interface Point {
  x: number;
  y: number;
}

interface Node extends Point {
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  r: number;
  expert: boolean;
  glow: number;
}

interface Pulse {
  from: Point;
  to: Node;
  t: number;
  hops: number;
  expert: boolean; // orange when it comes from an expert (or the visitor)
  fast: boolean; // signals the visitor sends move quicker than the calm background ones
}

const VISIBILITY = 0.55; // overall strength of the whole network, 1 = full
const SCROLL_FACTOR = 0.6; // 1 = moves exactly with the page, 0 = stays fixed
const CURSOR_RADIUS = 180;
const IDLE_PULSE_EVERY = 1100; // ms between background signals
const IDLE_PULSE_SPEED = 0.7; // px per frame
const FAST_PULSE_SPEED = 1.8;
const EDGE = 40; // how far off-screen a node goes before wrapping to the other side
const ORANGE = '243, 128, 32';
const INK = '45, 42, 38';

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let linkDistance = 140;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let animationFrameId = 0;
    let lastFrame = performance.now();
    let lastPulse = 0;
    let lastCursorPulse = 0;
    let lastScrollY = window.scrollY;

    // The visitor is a temporary node in the network
    const cursor = { x: 0, y: 0, active: false, strength: 0 };

    const createNodes = () => {
      const isSmall = width < 768;
      const count = Math.max(30, Math.min(90, Math.round((width * height) / 13000)));
      const expertCount = isSmall ? 3 : 5;
      linkDistance = isSmall ? 115 : 145;

      nodes = Array.from({ length: count }, (_, i) => {
        const expert = i < expertCount;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.015 + Math.random() * 0.03; // a very slow drift
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          r: expert ? 4 + Math.random() : 1.6 + Math.random() * 1.1,
          expert,
          glow: 0,
        };
      });
      pulses = [];
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const sizeChanged = Math.abs(window.innerWidth - width) > 80 || nodes.length === 0;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (sizeChanged) createNodes();
      if (reducedMotion) draw(0);
    };

    const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

    const neighbours = (point: Point, exclude?: Point) =>
      nodes.filter((n) => n !== exclude && distance(point, n) < linkDistance);

    // Pick where a signal goes next, leaning towards experts so handoffs are visible
    const nextHop = (at: Node, cameFrom: Point) => {
      const options = neighbours(at, cameFrom);
      if (options.length === 0) return null;
      const experts = options.filter((n) => n.expert);
      if (experts.length > 0 && Math.random() < 0.5) {
        return experts[Math.floor(Math.random() * experts.length)];
      }
      return options[Math.floor(Math.random() * options.length)];
    };

    const sendPulse = (from: Point, to: Node, expert: boolean, fast: boolean) => {
      if (pulses.length < 36) pulses.push({ from, to, t: 0, hops: 0, expert, fast });
    };

    const spawnAiPulse = () => {
      const start = nodes[Math.floor(Math.random() * nodes.length)];
      if (start.expert) return;
      const to = nextHop(start, start);
      if (to) sendPulse(start, to, false, false);
    };

    const pulseFromCursor = (count: number) => {
      const origin = { x: cursor.x, y: cursor.y };
      const nearest = [...nodes]
        .sort((a, b) => distance(origin, a) - distance(origin, b))
        .slice(0, count);
      nearest.forEach((n) => {
        if (distance(origin, n) < linkDistance * 1.4) sendPulse(origin, n, true, true);
      });
    };

    const update = (step: number, now: number) => {
      // The network scrolls with the page at a slower rate (parallax), wrapping top to bottom
      const scrollDelta = (window.scrollY - lastScrollY) * SCROLL_FACTOR;
      lastScrollY = window.scrollY;

      for (const n of nodes) {
        // Near the visitor, nodes wake up and swirl; elsewhere they barely drift
        if (cursor.active) {
          const dx = cursor.x - n.x;
          const dy = cursor.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < CURSOR_RADIUS && d > 0) {
            const energy = 1 - d / CURSOR_RADIUS;
            const pull = d < 50 ? -0.03 : 0.012 * energy; // come closer, but keep some space
            n.vx += ((dx / d) * pull + (-dy / d) * 0.09 * energy) * step;
            n.vy += ((dy / d) * pull + (dx / d) * 0.09 * energy) * step;
            const maxSpeed = 0.2 + energy * 2.2;
            const speed = Math.hypot(n.vx, n.vy);
            if (speed > maxSpeed) {
              n.vx = (n.vx / speed) * maxSpeed;
              n.vy = (n.vy / speed) * maxSpeed;
            }
          }
        }
        // Ease back to the slow drift once the visitor moves on
        n.vx += (n.baseVx - n.vx) * 0.015 * step;
        n.vy += (n.baseVy - n.vy) * 0.015 * step;
        n.x += n.vx * step;
        n.y += n.vy * step - scrollDelta;

        if (n.x < 0 || n.x > width) {
          n.vx *= -1;
          n.baseVx *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
        }
        if (n.y < -EDGE) n.y += height + EDGE * 2;
        else if (n.y > height + EDGE) n.y -= height + EDGE * 2;
        n.glow = Math.max(0, n.glow - 0.015 * step);
      }

      if (now - lastPulse > IDLE_PULSE_EVERY) {
        spawnAiPulse();
        lastPulse = now;
      }
      if (cursor.active && now - lastCursorPulse > 900) {
        pulseFromCursor(1);
        lastCursorPulse = now;
      }
      cursor.strength += ((cursor.active ? 1 : 0) - cursor.strength) * 0.08 * step;

      // Move signals; when one lands it lights the node and may travel on
      const next: Pulse[] = [];
      for (const p of pulses) {
        const length = Math.max(distance(p.from, p.to), 1);
        if (length > linkDistance * 1.5) continue; // its node wrapped away or drifted off
        p.t += ((p.fast ? FAST_PULSE_SPEED : IDLE_PULSE_SPEED) * step) / length;
        if (p.t < 1) {
          next.push(p);
          continue;
        }
        const at = p.to;
        at.glow = at.expert ? 1 : 0.6;
        // An expert answers with an orange signal of its own
        const expert = at.expert || p.expert;
        if (p.hops < 4 && Math.random() < 0.75) {
          const to = nextHop(at, p.from);
          if (to) next.push({ from: at, to, t: 0, hops: p.hops + 1, expert, fast: p.fast });
        }
      }
      pulses = next;
    };

    const draw = (step: number) => {
      ctx.clearRect(0, 0, width, height);

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = distance(a, b);
          if (d >= linkDistance) continue;
          const fade = 1 - d / linkDistance;
          const toExpert = a.expert || b.expert;
          ctx.strokeStyle = toExpert
            ? `rgba(${ORANGE}, ${fade * 0.26})`
            : `rgba(${INK}, ${fade * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // The visitor's links into the network
      if (cursor.strength > 0.01) {
        for (const n of nodes) {
          const d = distance(cursor, n);
          if (d >= 180) continue;
          ctx.strokeStyle = `rgba(${ORANGE}, ${(1 - d / 180) * 0.3 * cursor.strength})`;
          ctx.beginPath();
          ctx.moveTo(cursor.x, cursor.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        if (n.expert) {
          const halo = n.r + 6 + n.glow * 8;
          const gradient = ctx.createRadialGradient(n.x, n.y, n.r, n.x, n.y, halo);
          gradient.addColorStop(0, `rgba(${ORANGE}, ${0.18 + n.glow * 0.3})`);
          gradient.addColorStop(1, `rgba(${ORANGE}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(n.x, n.y, halo, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${ORANGE}, ${0.65 + n.glow * 0.35})`;
        } else {
          ctx.fillStyle = `rgba(${INK}, ${0.22 + n.glow * 0.35})`;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Signals
      if (step > 0) {
        for (const p of pulses) {
          const x = p.from.x + (p.to.x - p.from.x) * p.t;
          const y = p.from.y + (p.to.y - p.from.y) * p.t;
          const colour = p.expert ? ORANGE : INK;
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 7);
          gradient.addColorStop(0, `rgba(${colour}, ${p.expert ? 0.55 : 0.35})`);
          gradient.addColorStop(1, `rgba(${colour}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${colour}, ${p.expert ? 0.9 : 0.6})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      const step = Math.min((now - lastFrame) / 16.67, 3);
      lastFrame = now;
      update(step, now);
      draw(step);
      animationFrameId = requestAnimationFrame(loop);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      cursor.active = true;
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      // On touch screens a tap sends signals out from that spot
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      pulseFromCursor(3);
    };

    const handleMouseLeave = () => {
      cursor.active = false;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    if (!reducedMotion) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerdown', handlePointerDown, { passive: true });
      document.documentElement.addEventListener('mouseleave', handleMouseLeave);
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: VISIBILITY }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
