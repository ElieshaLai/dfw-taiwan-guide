export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "16px 24px",
      borderBottom: "1px solid #ddd",
      fontFamily: "sans-serif"
    }}>
      <div style={{ fontWeight: "bold" }}>
        DFW 台灣人生活指南
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        <a href="/">首頁</a>
        <a href="#">生活指南</a>
        <a href="#">學區</a>
        <a href="#">美食</a>
        <a href="#">活動</a>
      </div>
    </nav>
  );
}