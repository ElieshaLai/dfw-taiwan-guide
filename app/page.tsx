import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        <h1>DFW 台灣生活指南</h1>
        <p>幫助剛搬到 Dallas–Fort Worth 的台灣人快速上手生活。</p>

        <h2>生活分類</h2>
        <ul>
          <li>🏠 居住與學區</li>
          <li>🍜 美食與採買</li>
          <li>📄 生活辦理</li>
          <li>🎉 活動與社群</li>
        </ul>
      </div>
    </main>
  );
}