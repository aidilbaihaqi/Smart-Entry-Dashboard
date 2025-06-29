import React, { useEffect, useRef, useState } from "react";

// Simple retro pixel cat SVG with walk animation
function PixelCat({ size = 52, speed = 2 }) {
  const [dir, setDir] = useState(1);
  const [x, setX] = useState(0);
  const frame = useRef();
  // Container width (vw minus size), tweak as needed for responsiveness
  const maxX = typeof window !== "undefined" ? Math.min(window.innerWidth, 420) - size : 350;

  useEffect(() => {
    let stopped = false;
    function animate() {
      setX((prev) => {
        let next = prev + speed * dir;
        if (next < 0) {
          setDir(1);
          next = 0;
        } else if (next > maxX) {
          setDir(-1);
          next = maxX;
        }
        return next;
      });
      if (!stopped) frame.current = requestAnimationFrame(animate);
    }
    frame.current = requestAnimationFrame(animate);
    return () => {
      stopped = true;
      cancelAnimationFrame(frame.current);
    };
  }, [dir, speed, maxX]);

  // Retro cat SVG, flips horizontally when direction is -1
  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: size + 12,
      marginBottom: 6,
      overflow: "visible"
    }}>
      <div style={{
        position: "absolute",
        left: x,
        transition: "left 0.07s",
        transform: dir === 1 ? "scaleX(1)" : "scaleX(-1)"
      }}>
        <svg
          width={size} height={size} viewBox="0 0 32 32"
          style={{ filter: "drop-shadow(0 0 6px #0ff8)", imageRendering: "pixelated" }}
        >
          <rect x="3" y="17" width="4" height="8" fill="#3b2a20" /> {/* Left leg */}
          <rect x="25" y="17" width="4" height="8" fill="#3b2a20" /> {/* Right leg */}
          <rect x="7" y="7" width="18" height="14" fill="#FFD700" stroke="#333" strokeWidth="1"/>
          <rect x="5" y="13" width="4" height="7" fill="#FFD700" />
          <rect x="23" y="13" width="4" height="7" fill="#FFD700" />
          <rect x="13" y="4" width="6" height="5" fill="#FFD700" />
          <rect x="12" y="4" width="2" height="2" fill="#444" /> {/* Left ear */}
          <rect x="18" y="4" width="2" height="2" fill="#444" /> {/* Right ear */}
          <rect x="15" y="11" width="2" height="2" fill="#000" /> {/* Nose */}
          {/* Eyes - blink every 1.2s */}
          <rect x="12" y="10" width="2" height="2" fill="#000"
            style={{
              opacity: Math.floor(Date.now() / 600) % 2 === 0 ? 1 : 0.15,
              transition: "opacity 0.1s"
            }}
          />
          <rect x="18" y="10" width="2" height="2" fill="#000"
            style={{
              opacity: Math.floor(Date.now() / 600) % 2 === 0 ? 1 : 0.15,
              transition: "opacity 0.1s"
            }}
          />
          {/* Tail */}
          <rect x="27" y="16" width="5" height="2" fill="#FFD700" />
          {/* Whiskers */}
          <rect x="9" y="13" width="3" height="1" fill="#222" />
          <rect x="20" y="13" width="3" height="1" fill="#222" />
        </svg>
      </div>
    </div>
  );
}

export default function DashboardHeader() {
  return (
    <header style={{
      width: "100%",
      maxWidth: 800,
      margin: "0 auto",
      textAlign: "center",
      marginBottom: 8,
      paddingTop: 22
    }}>
      <PixelCat />
      <h1 style={{
        fontWeight: 800,
        fontSize: 26,
        color: "#0ff",
        textShadow: "0 0 20px #0ff8, 0 0 5px #111",
        fontFamily: "'Press Start 2P', 'Consolas', monospace",
        letterSpacing: 2,
        margin: "7px 0 0 0"
      }}>
        ░▒▓█ Smart Entry Room █▓▒░
      </h1>
      <div style={{
        fontSize: 14,
        color: "#FFD700",
        fontFamily: "'Press Start 2P', 'Consolas', monospace",
        letterSpacing: 1,
        margin: "4px 0 0 0"
      }}>
        Retro Dashboard — {new Date().toLocaleDateString()}
      </div>
    </header>
  );
}
