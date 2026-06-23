// app/page.tsx
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>

        {/* Hero — 換圖時改成 bg-[url('/hero.jpg')] bg-cover bg-center */}
        <section
          className="relative text-white"
          style={{
            background: "linear-gradient(135deg, #6B4423 0%, #A63F24 50%, #4e2e10 100%)",
          }}
        >
          {/* 暗化遮罩，換圖後自動生效 */}
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />

          <div className="relative max-w-5xl mx-auto px-5 py-32 text-center">

            {/* Badge */}
            <div
              className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-6"
              style={{
                backgroundColor: "rgba(232,168,24,0.15)",
                border: "1px solid rgba(232,168,24,0.4)",
                color: "#E8A818",
              }}
            >
              達拉斯 · 台灣人社群
            </div>

            {/* 大標 */}
            <h1 className="font-black uppercase tracking-widest mb-5 leading-tight"
                style={{ fontSize: "clamp(40px, 8vw, 72px)" }}>
              <span style={{ color: "#E8A818" }}>DFW</span>
              <br />
              <span style={{ color: "#C49A6C", fontSize: "0.6em", letterSpacing: "0.25em" }}>TAIWAN GUIDE</span>
            </h1>

            <p className="text-lg mb-3" style={{ color: "rgba(196,154,108,0.9)" }}>
              給台灣人的 Dallas–Fort Worth 生活指南
            </p>

            <p className="max-w-xl mx-auto leading-relaxed"
               style={{ color: "rgba(255,255,255,0.55)", fontSize: "15px" }}>
              從租屋、學區到美食與生活資訊，協助你快速適應德州生活。
            </p>

            {/* CTA 按鈕 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Link
                href="/guides/rent"
                className="px-7 py-3 rounded-xl font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#E8A818", color: "#3a1e08" }}
              >
                開始探索
              </Link>
              <Link
                href="/community"
                className="px-7 py-3 rounded-xl font-semibold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(196,154,108,0.5)",
                  color: "#C49A6C",
                }}
              >
                社群活動
              </Link>
            </div>
          </div>
        </section>

        {/* 內容區 */}
        <div
          className="max-w-5xl mx-auto px-5 pb-20"
          style={{ backgroundColor: "#FBF5EE" }}
        >
          <p
            className="text-center text-xs mt-16"
            style={{ color: "#C49A6C", opacity: 0.6 }}
          >
            DFW Taiwan Guide · 持續更新中
          </p>
        </div>

      </main>
    </>
  );
}