// app/restaurants/page.tsx
import { supabase } from "../../lib/supabase";
import Navbar from "../../components/Navbar";

export default async function RestaurantsPage() {
  const { data: restaurants, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("is_published", true)
    .order("name");

  if (error) return <p>載入失敗：{error.message}</p>;

  return (
    <>
      <Navbar />
      <main className="px-6 py-12" style={{ backgroundColor: "#FBF5EE", minHeight: "100vh" }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="font-bold mb-8" style={{ color: "#6B4423", fontSize: "24px" }}>
            🍜 台灣餐廳
          </h1>

          {restaurants.length === 0 && (
            <p style={{ color: "#C49A6C" }}>目前還沒有餐廳資料。</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {restaurants.map((r) => (
              <div
                key={r.id}
                className="p-5 rounded-xl"
                style={{ backgroundColor: "white", border: "1px solid #e8d8c4" }}
              >
                <h2 className="font-bold text-lg mb-1" style={{ color: "#6B4423" }}>
                  {r.name}
                </h2>
                <p className="text-xs mb-2" style={{ color: "#A63F24" }}>
                  {r.category} · {r.city}
                </p>
                <p className="text-sm mb-3" style={{ color: "#888" }}>
                  {r.description}
                </p>
                {r.address && (
                  <p className="text-xs mb-2" style={{ color: "#C49A6C" }}>
                    📍 {r.address}
                  </p>
                )}
                {r.phone && (
                  <p className="text-xs mb-2" style={{ color: "#C49A6C" }}>
                    📞 {r.phone}
                  </p>
                )}
                {r.google_maps_url && (
                  <a
                    href={r.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium"
                    style={{ color: "#E8A818" }}
                  >
                    Google Maps →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}