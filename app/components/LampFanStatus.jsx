import React from "react";
import { FaLightbulb, FaFan } from "react-icons/fa";
import { db, ref, set } from "../utils/firebase";

// Handler untuk ON/OFF ke Firebase
function handleLampu(on) {
  set(ref(db, "/info/lamp_status"), on ? "on" : "off");
}
function handleKipas(on) {
  set(ref(db, "/info/fan_status"), on ? "on" : "off");
}

export function LampuStatusCard({ isOn }) {
  return (
    <div style={{
      background: "rgba(30, 30, 40, 0.98)",
      borderRadius: 16,
      border: `2.5px solid #FFD700`,
      padding: 28,
      boxShadow: isOn
        ? "0 0 32px 6px #FFD700cc"
        : "0 0 12px 2px #FFD70055",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "'Press Start 2P', 'Consolas', monospace",
      minWidth: 0,
      width: "100%",
      height: "100%",
      justifyContent: "center"
    }}>
      <FaLightbulb
        size={34}
        color={isOn ? "#FFD700" : "#444"}
        style={{
          filter: isOn
            ? "drop-shadow(0 0 12px #FFD700bb)"
            : "drop-shadow(0 0 4px #333)"
        }}
      />
      <div style={{ color: "#FFD700", fontSize: 16, margin: "10px 0 2px" }}>Lampu</div>
      <div style={{
        fontWeight: 900,
        color: isOn ? "#FFD700" : "#fff",
        fontSize: 22,
        textShadow: isOn
          ? "0 0 12px #FFD70099"
          : "0 0 8px #aaa"
      }}>
        {isOn ? "ON" : "OFF"}
      </div>
      <button
        onClick={() => handleLampu(!isOn)}
        style={{
          marginTop: 18,
          background: isOn ? "#FFD700" : "#222",
          color: isOn ? "#181423" : "#FFD700",
          border: "none",
          borderRadius: 7,
          fontFamily: "'Press Start 2P', 'Consolas', monospace",
          fontSize: 13,
          padding: "9px 22px",
          boxShadow: isOn ? "0 0 12px #FFD70088" : "0 0 4px #FFD70055",
          cursor: "pointer",
          fontWeight: "bold",
          letterSpacing: 1.5,
          transition: "all .15s"
        }}
      >
        {isOn ? "MATIKAN" : "NYALAKAN"}
      </button>
    </div>
  );
}

export function FanStatusCard({ isOn }) {
  return (
    <div style={{
      background: "rgba(30, 30, 40, 0.98)",
      borderRadius: 16,
      border: `2.5px solid #00E6FF`,
      padding: 28,
      boxShadow: isOn
        ? "0 0 32px 6px #00e6ffbb"
        : "0 0 12px 2px #00e6ff44",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "'Press Start 2P', 'Consolas', monospace",
      minWidth: 0,
      width: "100%",
      height: "100%",
      justifyContent: "center"
    }}>
      <span style={{
        display: "inline-block",
        animation: isOn ? "spinFan 1s linear infinite" : "none"
      }}>
        <FaFan size={34} color="#00E6FF"
          style={{
            filter: isOn
              ? "drop-shadow(0 0 14px #00E6FFcc)"
              : "drop-shadow(0 0 4px #222)"
          }}
        />
      </span>
      <div style={{ color: "#00E6FF", fontSize: 16, margin: "10px 0 2px" }}>Kipas</div>
      <div style={{
        fontWeight: 900,
        color: isOn ? "#00E6FF" : "#fff",
        fontSize: 22,
        textShadow: isOn
          ? "0 0 12px #00E6FF88"
          : "0 0 8px #aaa"
      }}>
        {isOn ? "ON" : "OFF"}
      </div>
      <button
        onClick={() => handleKipas(!isOn)}
        style={{
          marginTop: 18,
          background: isOn ? "#00E6FF" : "#222",
          color: isOn ? "#181423" : "#00E6FF",
          border: "none",
          borderRadius: 7,
          fontFamily: "'Press Start 2P', 'Consolas', monospace",
          fontSize: 13,
          padding: "9px 22px",
          boxShadow: isOn ? "0 0 12px #00E6FF88" : "0 0 4px #00E6FF55",
          cursor: "pointer",
          fontWeight: "bold",
          letterSpacing: 1.5,
          transition: "all .15s"
        }}
      >
        {isOn ? "MATIKAN" : "NYALAKAN"}
      </button>
      <style>
        {`
          @keyframes spinFan {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}
