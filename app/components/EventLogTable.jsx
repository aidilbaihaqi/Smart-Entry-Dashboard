import React, { useState } from "react";

// Styling untuk table retro
const tableStyle = {
  width: "100%",
  background: "rgba(30,30,50,0.97)",
  borderCollapse: "collapse",
  fontFamily: "'Press Start 2P', 'Consolas', monospace",
  color: "#FFD700",
  boxShadow: "0 0 10px 2px #0ff9",
};

const thStyle = {
  background: "#0ff",
  color: "#222",
  padding: "10px 5px",
  border: "2px solid #0ff",
  fontSize: 13,
  textTransform: "uppercase",
  letterSpacing: 1
};

const tdStyle = {
  padding: "9px 7px",
  border: "2px solid #0ff",
  fontSize: 12,
  color: "#fff",
  textShadow: "0 0 6px #0ff8"
};

const buttonStyle = {
  fontFamily: "'Press Start 2P', 'Consolas', monospace",
  margin: "5px 3px",
  fontSize: 10,
  background: "#181423",
  color: "#0ff",
  border: "1.5px solid #0ff",
  borderRadius: 4,
  padding: "4px 10px",
  cursor: "pointer",
  boxShadow: "0 0 5px #0ff7"
};

export default function EventLogTable({ logs }) {
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const maxPage = Math.max(0, Math.ceil(logs.length / pageSize) - 1);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const handleNext = () => setPage((p) => Math.min(p + 1, maxPage));

  const pagedLogs = logs.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div style={{ marginTop: 25 }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>No</th>
            <th style={thStyle}>Event</th>
            <th style={thStyle}>Waktu</th>
          </tr>
        </thead>
        <tbody>
          {pagedLogs.map((log, i) => (
            <tr key={i}>
              <td style={tdStyle}>{page * pageSize + i + 1}</td>
              <td style={tdStyle}>{log.event}</td>
              <td style={tdStyle}>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
