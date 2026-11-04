import { useEffect, useRef, type ReactNode } from "react";

type ClickSparkProps = {
  children: ReactNode;
  sparkColor?: string;
  shape?: "line";
  sparkCount?: number;
  sparkSize?: number;
  sparkRadius?: number;
  duration?: number;
};

type Spark = {
  x: number;
  y: number;
  angle: number;
  bornAt: number;
};

export default function ClickSpark({
  children,
  sparkColor = "#fff",
  shape = "line",
  sparkCount = 8,
  sparkSize = 14,
  sparkRadius = 30,
  duration = 500,
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;

    const sparks: Spark[] = [];
    let frameId: number | null = null;
    let pixelRatio = 1;
    const lifespan = Math.max(duration, 1);
    const count = Math.max(0, Math.floor(sparkCount));

    const resizeCanvas = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawFrame = (now: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.strokeStyle = sparkColor;
      context.lineWidth = 2;
      context.lineCap = "round";

      for (let index = sparks.length - 1; index >= 0; index -= 1) {
        const spark = sparks[index];
        const progress = Math.min((now - spark.bornAt) / lifespan, 1);
        if (progress >= 1) {
          sparks.splice(index, 1);
          continue;
        }

        const easedProgress = 1 - (1 - progress) ** 3;
        const radius = sparkRadius * easedProgress;
        const innerRadius = radius + sparkSize * easedProgress * 0.35;
        const outerRadius = innerRadius + sparkSize * (1 - progress * 0.45);
        context.globalAlpha = 1 - progress;
        context.beginPath();
        context.moveTo(
          spark.x + Math.cos(spark.angle) * innerRadius,
          spark.y + Math.sin(spark.angle) * innerRadius
        );
        context.lineTo(
          spark.x + Math.cos(spark.angle) * outerRadius,
          spark.y + Math.sin(spark.angle) * outerRadius
        );
        context.stroke();
      }

      context.globalAlpha = 1;
      if (sparks.length) {
        frameId = window.requestAnimationFrame(drawFrame);
      } else {
        frameId = null;
      }
    };

    const scheduleFrame = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(drawFrame);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !container.contains(event.target as Node)) return;
      const now = performance.now();
      for (let index = 0; index < count; index += 1) {
        sparks.push({
          x: event.clientX,
          y: event.clientY,
          angle: (Math.PI * 2 * index) / count,
          bornAt: now,
        });
      }
      if (count) scheduleFrame();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointerdown", handlePointerDown);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [duration, shape, sparkColor, sparkCount, sparkRadius, sparkSize]);

  return (
    <div ref={containerRef} className="relative">
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 41,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
