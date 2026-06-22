import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main  style={{
    fontFamily: "sans-serif",
    padding: "0 16px",
    maxWidth: "1100px",
    margin: "0 auto",
  }}>
      <Navbar />

      {/* HERO 區 */}
      <section style={{ marginTop: "24px", maxWidth: "900px" }}>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: "bold" }}>
          DFW 台灣人生活指南
        </h1>

        <h2 style={{ fontSize: "18px", marginTop: "12px", color: "#333" }}>
          幫助 Dallas–Fort Worth 的台灣人快速適應生活 🇹🇼🇺🇸
        </h2>

        <p style={{ marginTop: "8px", color: "#666", lineHeight: "1.6" }}>
          提供租屋、學區、美食與生活流程整理，讓剛來美國的你更快上手。
        </p>
      </section>

      {/* CTA */}
      <section style={{ marginTop: "28px" }}>
        <p style={{ fontWeight: 500 }}>
          從哪裡開始？選一個你現在最需要的生活主題 👇
        </p>
      </section>

      {/* 卡片區 */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
          marginTop: "16px",
          maxWidth: "1000px",
        }}
      >
        <div style={cardStyle}>
          🏠 租屋與生活區域
          <p style={descStyle}>Dallas / Plano / Frisco 居住比較與租屋資訊</p>
        </div>

        <div style={cardStyle}>
          🏫 學區分析
          <p style={descStyle}>學校評價、學區比較與家庭選擇指南</p>
        </div>

        <div style={cardStyle}>
          🍜 台灣美食地圖
          <p style={descStyle}>亞洲超市、台灣餐廳與必吃推薦</p>
        </div>

        <div style={cardStyle}>
          📄 生活流程指南
          <p style={descStyle}>銀行、駕照、保險、開車等新手教學</p>
        </div>
      </section>

      {/* 底部資訊 */}
      <section style={{ marginTop: "40px", color: "#888", fontSize: "13px" }}>
        <p>持續更新中 · DFW 台灣社群整理平台</p>
      </section>
    </main>
  );
}

const cardStyle = {
  padding: "18px",
  border: "1px solid #e5e5e5",
  borderRadius: "12px",
  cursor: "pointer",
  background: "#fff",
};

const descStyle = {
  fontSize: "12px",
  color: "#666",
  marginTop: "6px",
  lineHeight: "1.4",
};