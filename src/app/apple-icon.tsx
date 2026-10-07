import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 84,
          background: "linear-gradient(135deg, #14181d 0%, #0c0f12 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          borderRadius: 36,
          border: "5px solid #e06d53",
          fontWeight: 900,
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxShadow: "0 0 30px rgba(224, 109, 83, 0.4)",
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
          <span style={{ color: "#ffffff", marginLeft: "4px" }}>S</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

