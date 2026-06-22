import Navbar from "../../../components/Navbar";

export default function GuideTemplate() {
    return (
        <main
            style={{
                fontFamily: "sans-serif",
                padding: "0 20px",
                maxWidth: "900px",
                margin: "0 auto",
                textAlign: "left",
            }}
        >
            <Navbar />

            {/* Title */}
            <h1 style={{ marginTop: "24px", fontSize: "28px" }}>
                🏠 標題（例如：DFW 租屋指南）
            </h1>

            {/* Intro */}
            <p style={{ color: "#666" }}>
                一段簡短介紹：這一頁在講什麼，幫誰解決什麼問題。
            </p>

            {/* Section 1 */}
            <h2 style={h2}>📍 概覽</h2>
            <p>
                這裡寫整體說明，例如 DFW 各區特色總覽。
            </p>

            {/* Section 2 */}
            <h2 style={h2}>📊 區域分析</h2>

            <div style={card}>
                🟢 Plano：學區最好、台灣家庭最多
            </div>

            <div style={card}>
                🟡 Frisco：新社區、安全性高
            </div>

            <div style={card}>
                🔵 Irving：交通方便、餐廳多
            </div>

            {/* Section 3 */}
            <h2 style={h2}>💡 建議</h2>
            <p>
                給使用者的實際建議，例如：第一次來建議住哪裡。
            </p>

            {/* Section 4 */}
            <h2 style={h2}>⚠️ 注意事項</h2>
            <p>
                例如租房陷阱、學區限制、租金波動等。
            </p>
        </main>
    );
}

const card = {
    padding: "14px",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    marginBottom: "10px",
    background: "#fafafa",
};

const h2 = {
    marginTop: "24px",
    fontSize: "20px",
};