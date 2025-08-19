"use client";

import React from "react";

interface PortalBannerProps {
  heightClass?: string;
}

export default function PortalBanner({ heightClass = "h-[420px]" }: PortalBannerProps) {
  return (
    <section className={`relative w-full ${heightClass} overflow-hidden bg-slate-950`}>
      {/* Subtle dotted grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Left server rack panels */}
      <div className="absolute left-0 top-0 h-full w-1/4 flex flex-col justify-center gap-4 pl-8">
        {Array.from({ length: 4 }).map((_, rackIndex) => (
          <div
            key={`left-rack-${rackIndex}`}
            className="relative h-16 w-3/4 rounded border border-cyan-900/30 bg-slate-900/50 p-2"
            style={{
              boxShadow: "inset 0 0 20px rgba(6, 182, 212, 0.1)",
            }}
          >
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, lightIndex) => (
                <div
                  key={`left-light-${rackIndex}-${lightIndex}`}
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: lightIndex % 2 === 0 ? "#00ffcc" : "#06b6d4",
                    boxShadow: `0 0 6px ${lightIndex % 2 === 0 ? "#00ffcc" : "#06b6d4"}`,
                    animation: `blink ${2 + rackIndex * 0.3 + lightIndex * 0.2}s ${
                      rackIndex * 0.2 + lightIndex * 0.1
                    }s infinite ease-in-out`,
                  }}
                />
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              {Array.from({ length: 3 }).map((_, lightIndex) => (
                <div
                  key={`left-light2-${rackIndex}-${lightIndex}`}
                  className="h-1.5 w-6 rounded-sm"
                  style={{
                    background: "linear-gradient(90deg, #06b6d4, #00ffcc)",
                    opacity: 0.6,
                    animation: `pulse ${1.8 + rackIndex * 0.2 + lightIndex * 0.3}s ${
                      rackIndex * 0.1 + lightIndex * 0.2
                    }s infinite ease-in-out`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right server rack panels */}
      <div className="absolute right-0 top-0 h-full w-1/4 flex flex-col justify-center gap-4 pr-8">
        {Array.from({ length: 4 }).map((_, rackIndex) => (
          <div
            key={`right-rack-${rackIndex}`}
            className="relative ml-auto h-16 w-3/4 rounded border border-cyan-900/30 bg-slate-900/50 p-2"
            style={{
              boxShadow: "inset 0 0 20px rgba(6, 182, 212, 0.1)",
            }}
          >
            <div className="flex justify-end gap-2">
              {Array.from({ length: 5 }).map((_, lightIndex) => (
                <div
                  key={`right-light-${rackIndex}-${lightIndex}`}
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: lightIndex % 2 === 0 ? "#06b6d4" : "#00ffcc",
                    boxShadow: `0 0 6px ${lightIndex % 2 === 0 ? "#06b6d4" : "#00ffcc"}`,
                    animation: `blink ${2.2 + rackIndex * 0.3 + lightIndex * 0.2}s ${
                      rackIndex * 0.3 + lightIndex * 0.15
                    }s infinite ease-in-out`,
                  }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-end gap-2">
              {Array.from({ length: 3 }).map((_, lightIndex) => (
                <div
                  key={`right-light2-${rackIndex}-${lightIndex}`}
                  className="h-1.5 w-6 rounded-sm"
                  style={{
                    background: "linear-gradient(90deg, #00ffcc, #06b6d4)",
                    opacity: 0.6,
                    animation: `pulse ${2 + rackIndex * 0.2 + lightIndex * 0.3}s ${
                      rackIndex * 0.15 + lightIndex * 0.25
                    }s infinite ease-in-out`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Center glowing portal */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {/* Soft radial cyan/blue glow */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.15) 40%, transparent 70%)",
          }}
        />
        
        {/* Small bright core that pulses */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(255, 255, 255, 0.9), rgba(6, 182, 212, 0.7) 50%, transparent)",
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)",
            animation: "corePulse 3s ease-in-out infinite",
          }}
        />
        
        {/* Ring of small cyan dots that pulse and rotate */}
        <div
          aria-hidden
          className="relative"
          style={{
            width: 240,
            height: 240,
            animation: "slowRotate 30s linear infinite",
          }}
        >
          {Array.from({ length: 24 }).map((_, idx) => {
            const angle = (idx / 24) * 360;
            const radius = 120;
            const delay = (idx * 0.1) % 2;
            return (
              <span
                key={idx}
                className="absolute h-2.5 w-2.5 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${angle}deg) translateX(${radius}px)`,
                  transformOrigin: "0 0",
                  background: "rgba(6, 182, 212, 0.9)",
                  boxShadow:
                    "0 0 8px rgba(6, 182, 212, 0.9), 0 0 16px rgba(59, 130, 246, 0.5)",
                  animation: `dotPulse 2.5s ${delay}s ease-in-out infinite`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          20% { opacity: 1; }
          50% { opacity: 0.3; }
          70% { opacity: 0.9; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.1); }
        }
        
        @keyframes corePulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1); 
            filter: brightness(1);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.15); 
            filter: brightness(1.3);
          }
        }
        
        @keyframes dotPulse {
          0%, 100% { 
            opacity: 0.6; 
            transform: rotate(var(--angle)) translateX(120px) scale(1);
          }
          50% { 
            opacity: 1; 
            transform: rotate(var(--angle)) translateX(120px) scale(1.3);
          }
        }
        
        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          span[style*="animation"],
          div[style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}