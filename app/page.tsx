// app/page.tsx
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>

        {/* Hero — 漸層佔位，之後換成 bg-[url('/hero.jpg')] bg-cover bg-center */}
        <section
          className="
            relative
            bg-gradient-to-br from-gray-900 via-gray-800 to-red-950
            text-white
          "
        >
          {/* 之後有圖片時加這層暗化遮罩會更好看 */}
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative max-w-5xl mx-auto px-5 py-32 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-3 py-1 rounded-full mb-6">
              達拉斯台灣人社群
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold mb-5 leading-tight tracking-tight">
              Welcome to{" "}
              <span className="text-red-400">DFW</span>
            </h1>

            <p className="text-xl text-white/70 mb-4">
              給台灣人的 Dallas–Fort Worth 生活指南
            </p>

            <p className="max-w-xl mx-auto text-white/50 leading-relaxed">
              從租屋、學區到美食與生活資訊，協助你快速適應德州生活。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <Link
                href="/guides/rent"
                className="bg-red-500 hover:bg-red-400 text-white px-7 py-3 rounded-xl font-medium transition-colors"
              >
                開始探索
              </Link>
              <Link
                href="/community"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-7 py-3 rounded-xl font-medium transition-colors"
              >
                社群活動
              </Link>
            </div>
          </div>
        </section>

        {/* 之後在這裡加精選推薦、最新活動等 section */}
        <div className="max-w-5xl mx-auto px-5 pb-20">
          <p className="text-center text-xs text-gray-300 mt-16">
            DFW 台灣人生活指南 · 持續更新中
          </p>
        </div>

      </main>
    </>
  );
}