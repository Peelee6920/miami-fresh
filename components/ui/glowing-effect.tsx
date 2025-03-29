"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const GlowingEffect = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-xl border border-[#ff6b6b]/20",
        "bg-white shadow-lg p-6",
        "before:pointer-events-none before:absolute before:inset-0",
        "before:opacity-0 before:transition-opacity before:duration-500 before:hover:opacity-100",
        "before:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,107,107,0.1),transparent_50%)]",
        "hover:border-[#ff6b6b]/30 transition-all duration-500",
        "hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}; 