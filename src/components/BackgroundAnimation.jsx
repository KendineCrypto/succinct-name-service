import React, { useEffect, useRef } from 'react';

const NODE_COUNT = 15;
const CONNECTIONS_PER_NODE = 3;
const NODE_RADIUS = 8;
const SPEED = 0.3;

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function createNodes() {
      const nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
          connections: [],
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
      for (let i = 0; i < NODE_COUNT; i++) {
        const indices = [];
        while (indices.length < CONNECTIONS_PER_NODE) {
          const idx = Math.floor(Math.random() * NODE_COUNT);
          if (idx !== i && !indices.includes(idx)) indices.push(idx);
        }
        nodes[i].connections = indices;
      }
      return nodes;
    }

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function handleMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    nodesRef.current = createNodes();
    resizeCanvas();
    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      // Dark pink gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#3a003a");
      gradient.addColorStop(0.5, "#7a005a");
      gradient.addColorStop(1, "#c8008f");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Mouse spotlight
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const spotlight = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
      spotlight.addColorStop(0, "rgba(255, 200, 255, 0.35)");
      spotlight.addColorStop(0.4, "rgba(255, 0, 128, 0.10)");
      spotlight.addColorStop(1, "rgba(255,0,128,0)");
      ctx.beginPath();
      ctx.arc(mx, my, 180, 0, Math.PI * 2);
      ctx.fillStyle = spotlight;
      ctx.fill();

      const time = Date.now() * 0.001;
      nodesRef.current.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < NODE_RADIUS || node.x > width - NODE_RADIUS) node.vx *= -1;
        if (node.y < NODE_RADIUS || node.y > height - NODE_RADIUS) node.vy *= -1;
      });
      // Neon pink connections
      nodesRef.current.forEach((node, i) => {
        node.connections.forEach(idx => {
          const target = nodesRef.current[idx];
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = "#ff3cac";
          ctx.shadowColor = "#ff3cac";
          ctx.shadowBlur = 18;
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
          ctx.restore();
        });
      });
      // Bright pink glowing nodes
      nodesRef.current.forEach(node => {
        const pulse = Math.sin(time + node.pulsePhase) * 0.5 + 0.5;
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_RADIUS + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 180, ${0.7 + pulse * 0.3})`;
        ctx.shadowColor = '#ff3cac';
        ctx.shadowBlur = 28 + pulse * 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'transparent',
        cursor: 'default'
      }}
    />
  );
};

export default BackgroundAnimation; 