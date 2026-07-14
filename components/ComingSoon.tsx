// components/ComingSoon.tsx
import Navbar from "./Navbar";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <Navbar />
      <main
        className="flex flex-col items-center justify-center"
        style={{ minHeight: "80vh", backgroundColor: "#FBF5EE" }}
      >
        <div className="text-center px-6">
          <p className="text-5xl mb-6">🚧</p>
          <h1
            className="font-bold mb-3"
            style={{ color: "#6B4423", fontSize: "24px" }}
          >
            {title}
          </h1>
          <p style={{ color: "#C49A6C", fontSize: "15px" }}>
            Working on it — 敬請期待！
          </p>
        </div>
      </main>
    </>
  );
}