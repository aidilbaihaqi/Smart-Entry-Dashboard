import React from "react";
import { FaTemperatureHigh, FaTint, FaCloudMeatball, FaListAlt } from "react-icons/fa";

// Pilih icon sesuai tipe card
const iconMap = {
  "Suhu": <FaTemperatureHigh color="#ff5588" size={32} />,
  "Kelembapan": <FaTint color="#00ffb0" size={32} />,
  "Gas": <FaCloudMeatball color="#00aaff" size={32} />,
  "Event Log": <FaListAlt color="#fff700" size={32} />
};

export default function SensorCard({ title, value, unit, color = "#00FF99" }) {
  return (
    <div
      style={{
        background: "rgba(30, 30, 40, 0.98)",
        borderRadius: 16,
        border: `2.5px solid ${color}`,
        padding: 24,
        minWidth: 120,
        minHeight: 115,
        margin: "10px 0",
        boxShadow: `0 0 18px 2px ${color}99, 0 0 6px 2px #222`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Press Start 2P', 'Consolas', monospace",
        transition: "transform .22s, box-shadow .22s",
        animation: "glowcard 2s ease-in-out infinite alternate"
      }}
      className="sensor-card"
    >
      <div style={{ marginBottom: 8 }}>
        {iconMap[title]}
      </div>
      <span style={{
        fontSize: 13, color: "#ccc", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3
      }}>{title}</span>
      <span style={{
        fontSize: 23, color: color, fontWeight: "bold", marginTop: 6, textShadow: `0 0 8px ${color}cc`
      }}>
        {value} <span style={{ fontSize: 11, color: "#888" }}>{unit}</span>
      </span>
      <style>
        {`
        @keyframes glowcard {
          0%   { box-shadow: 0 0 14px 2px ${color}33, 0 0 8px 2px #222; }
          100% { box-shadow: 0 0 32px 6px ${color}cc, 0 0 8px 2px #111; }
        }
        `}
      </style>
    </div>
  );
}
