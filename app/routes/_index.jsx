import React, { useEffect, useState } from "react";
import { db, ref, set, onValue } from "../utils/firebase";
import SensorCard from "../components/SensorCard";
import EventLogTable from "../components/EventLogTable";
import DashboardHeader from "../components/DashboardHeader";
import { LampuStatusCard, FanStatusCard } from "../components/LampFanStatus";

// Responsive hook
function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

const pageStyle = {
  background: "linear-gradient(130deg, #181423 70%, #291c35 100%)",
  minHeight: "100vh",
  color: "#fff",
  fontFamily: "'Press Start 2P', 'Consolas', monospace",
  padding: 0,
  margin: 0,
};

export default function Index() {
  const [info, setInfo] = useState({
    temperature: 0,
    humidity: 0,
    gas_value: 0,
    lamp_status: "off",
    fan_status: "off",
  });
  const [logs, setLogs] = useState([]);

  const isMobile = useIsMobile();

  useEffect(() => {
    const infoRef = ref(db, "/info");
    onValue(infoRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setInfo(val);
    });
    const logRef = ref(db, "/object_log");
    onValue(logRef, (snapshot) => {
      const logObj = snapshot.val() || {};
      setLogs(Object.values(logObj).reverse().slice(0, 10));
    });
  }, []);

  // Atur tinggi minimum grid kiri dan kanan agar rata desktop
  // (optional: bisa dihapus jika table selalu kurang dari 10 baris)
  const minSectionHeight = isMobile ? undefined : 460;

  return (
    <div style={pageStyle}>
      <DashboardHeader />

      {/* Flexbox: Desktop 2 kolom, Mobile 1 kolom */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "stretch",
          gap: 38,
          maxWidth: 1200,
          margin: "32px auto 0 auto",
          padding: "0 6vw",
          width: "100%",
        }}
      >
        {/* KIRI: Sensor + Status */}
        <div
          style={{
            flex: 2,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            minHeight: minSectionHeight,
            justifyContent: "stretch",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: 19,
              marginBottom: 20,
            }}
          >
            <SensorCard
              title="Suhu"
              value={info.temperature}
              unit="°C"
              color="#ff5588"
            />
            <SensorCard
              title="Kelembapan"
              value={info.humidity}
              unit="%"
              color="#00ffb0"
            />
            <SensorCard
              title="Gas"
              value={info.gas_value}
              unit=""
              color="#00aaff"
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 18,
              flex: 1,
              minHeight: isMobile ? undefined : 180,
              alignItems: "stretch",
            }}
          >
            <LampuStatusCard isOn={info.lamp_status === "on"} style={{ height: "100%" }} />
            <FanStatusCard isOn={info.fan_status === "on"} style={{ height: "100%" }} />
          </div>
        </div>

        {/* KANAN: Table Log */}
        <div
          style={{
            flex: 2,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            minHeight: minSectionHeight,
            justifyContent: "flex-start",
          }}
        >
          <h2
            style={{
              color: "#fff700",
              textShadow: "0 0 10px #fff70088",
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 10,
              letterSpacing: 2,
              textAlign: "left",
            }}
          >
            Log Terbaru
          </h2>
          <div style={{ flexGrow: 1 }}>
            <EventLogTable logs={logs} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: 32,
          color: "#ccc",
          textAlign: "center",
          fontSize: 12,
          fontFamily: "'Press Start 2P', 'Consolas', monospace",
        }}
      >
        <span
          style={{
            color: "#0ff",
            textShadow: "0 0 7px #0ff7",
          }}
        >
          &lt;/&gt; Smart Entry Room &copy; {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
