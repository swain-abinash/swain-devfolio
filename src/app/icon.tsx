import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "linear-gradient(135deg, #14181d 0%, #0c0f12 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          borderRadius: 8,
          border: "2px solid #e06d53",
          fontWeight: 900,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-0.5px",
          position: "relative",
          boxShadow: "0 0 12px rgba(224, 109, 83, 0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#e06d53" }}>A</span>
          <span style={{ color: "#ffffff", marginLeft: "1px" }}>S</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

