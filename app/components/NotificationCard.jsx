import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotificationCard({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        margin: "28px 0",
        padding: "22px 32px",
        background: "rgba(40,10,10,0.98)",
        border: "2.5px solid #FF4500",
        borderRadius: 14,
        color: "#FFF1C1",
        fontFamily: "'Press Start 2P', 'Consolas', monospace",
        fontSize: 15,
        display: "flex",
        alignItems: "center",
        gap: 18,
        boxShadow: "0 0 18px #FF450099, 0 0 6px #222",
        textShadow: "0 0 3px #FF4500, 0 0 6px #000",
        maxWidth: 500,
        marginLeft: "auto",
        marginRight: "auto",
        animation: "notifpop 1s cubic-bezier(.19,1,.22,1)",
      }}
    >
      <FaExclamationTriangle size={32} color="#FF4500" style={{ minWidth: 32 }}/>
      <span>{message}</span>
      <style>
        {`
          @keyframes notifpop {
            0% { transform: scale(0.7); opacity: 0;}
            80% { transform: scale(1.04);}
            100% { transform: scale(1); opacity: 1;}
          }
        `}
      </style>
    </div>
  );
}
