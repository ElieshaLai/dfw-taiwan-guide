// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Player } from "@lordicon/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MapIcon, ShoppingBagIcon, Menu, X } from "lucide-react";

import guideIcon     from "../public/icons/guide.json";
import homeIcon      from "../public/icons/home.json";
import pencilIcon    from "../public/icons/pencil.json";
import foodIcon      from "../public/icons/food.json";
import funIcon       from "../public/icons/fun.json";
import jobIcon       from "../public/icons/job.json";
import recommendIcon from "../public/icons/recommend.json";
import calendarIcon  from "../public/icons/calendar.json";

const navLinksBefore = [
  { href: "/life",        label: "新生活指南", icon: guideIcon },
  { href: "/guides/rent", label: "居住與租屋", icon: homeIcon },
  { href: "/education",   label: "學校與教育", icon: pencilIcon },
];

const navLinksAfter = [
  { href: "/explore",   label: "社群與玩樂", icon: funIcon },
  { href: "/jobs",      label: "工作與求職", icon: jobIcon },
  { href: "/directory", label: "名片與推薦", icon: recommendIcon },
  { href: "/events",    label: "活動日曆",   icon: calendarIcon },
];

const allLinks = [
  { href: "/life",        label: "新生活指南", icon: guideIcon },
  { href: "/guides/rent", label: "居住與租屋", icon: homeIcon },
  { href: "/education",   label: "學校與教育", icon: pencilIcon },
  { href: "/restaurants", label: "美食地圖",   icon: foodIcon },
  { href: "/shopping",    label: "購物地圖",   icon: foodIcon },
  { href: "/explore",     label: "社群與玩樂", icon: funIcon },
  { href: "/jobs",        label: "工作與求職", icon: jobIcon },
  { href: "/directory",   label: "名片與推薦", icon: recommendIcon },
  { href: "/events",      label: "活動日曆",   icon: calendarIcon },
];

const foodShoppingLinks = [
  {
    href: "/restaurants",
    icon: <MapIcon className="w-4 h-4" />,
    title: "美食地圖",
    description: "台灣餐廳、早午餐、小吃推薦",
  },
  {
    href: "/shopping",
    icon: <ShoppingBagIcon className="w-4 h-4" />,
    title: "購物地圖",
    description: "亞洲超市、台灣商品採買指南",
  },
];

function NavTab({
  href,
  label,
  icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: object;
  isActive: boolean;
}) {
  const playerRef = useRef<Player>(null);

  return (
    <Link
      href={href}
      className="flex flex-row items-center gap-2 px-4 py-3 border-b-2 transition-all duration-150 whitespace-nowrap text-sm font-medium"
      style={{
        borderBottomColor: isActive ? "#A63F24" : "transparent",
        color: isActive ? "#A63F24" : "#6B4423",
      }}
      onMouseEnter={() => playerRef.current?.playFromBeginning()}
    >
      <Player ref={playerRef} icon={icon as any} size={24} />
      <span>{label}</span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const foodPlayerRef = useRef<Player>(null);

  const isFoodActive =
    pathname.startsWith("/restaurants") || pathname.startsWith("/shopping");

  return (
    <header className="sticky top-0 z-50">

      {/* 第一層：深棕 Header */}
      <div style={{ backgroundColor: "#6B4423" }}>
        <div className="w-full px-4 sm:px-6 h-14 sm:h-20 flex items-center justify-between gap-3">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex flex-col items-start leading-none">
            <span className="font-black tracking-widest uppercase"
              style={{ color: "#E8A818", fontSize: "clamp(14px, 4vw, 20px)", lineHeight: "1.1" }}>
              DFW
            </span>
            <span className="font-semibold tracking-widest uppercase hidden sm:block"
              style={{ color: "#C49A6C", fontSize: "18px", lineHeight: "1.3", letterSpacing: "0.2em" }}>
              Taiwan
            </span>
            <span className="font-semibold tracking-widest uppercase hidden sm:block"
              style={{ color: "#C49A6C", fontSize: "18px", lineHeight: "1.3", letterSpacing: "0.2em" }}>
              Guide
            </span>
            <span className="font-semibold tracking-widest uppercase sm:hidden"
              style={{ color: "#C49A6C", fontSize: "10px", letterSpacing: "0.15em" }}>
              TAIWAN GUIDE
            </span>
          </Link>

          {/* 搜尋列 */}
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-1.5 sm:py-2 w-full max-w-xs sm:max-w-sm"
            style={{ backgroundColor: "#4e2e10", border: "1px solid #8B5A2B" }}
          >
            <svg className="w-4 h-4 shrink-0" style={{ color: "#C49A6C" }}
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="搜尋⋯"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-sm outline-none w-full"
              style={{ color: "white" }}
            />
          </div>

          {/* 漢堡按鈕 — 只在手機顯示 */}
          <button
            className="sm:hidden shrink-0 p-2 rounded-lg transition-colors"
            style={{ color: "#E8A818" }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="選單"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* 第二層：桌面版橫向 Tab — 手機隱藏 */}
      <div className="hidden sm:block" style={{ backgroundColor: "#F9F2E8", borderBottom: "2px solid #C49A6C" }}>
        <div className="w-full px-6 flex items-center overflow-x-auto scrollbar-none">

          {navLinksBefore.map((link) => (
            <NavTab
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              isActive={pathname.startsWith(link.href)}
            />
          ))}

          {/* 美食與購物下拉 */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="flex flex-row items-center gap-2 px-4 py-3 border-b-2 bg-transparent rounded-none h-auto text-sm font-medium transition-all duration-150"
                  style={{
                    borderBottomColor: isFoodActive ? "#A63F24" : "transparent",
                    color: isFoodActive ? "#A63F24" : "#6B4423",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={() => foodPlayerRef.current?.playFromBeginning()}
                >
                  <Player ref={foodPlayerRef} icon={foodIcon as any} size={24} />
                  <span>美食與購物</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-56 p-2">
                    {foodShoppingLinks.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink
                          render={
                            <Link
                              href={item.href}
                              className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-amber-50"
                            >
                              <span className="mt-0.5 shrink-0" style={{ color: "#A63F24" }}>
                                {item.icon}
                              </span>
                              <div>
                                <div className="text-sm font-semibold mb-0.5" style={{ color: "#6B4423" }}>
                                  {item.title}
                                </div>
                                <div className="text-xs leading-relaxed" style={{ color: "#C49A6C" }}>
                                  {item.description}
                                </div>
                              </div>
                            </Link>
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {navLinksAfter.map((link) => (
            <NavTab
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              isActive={pathname.startsWith(link.href)}
            />
          ))}

        </div>
      </div>

      {/* 手機版漢堡選單 */}
      {menuOpen && (
        <div
          className="sm:hidden absolute w-full z-50 shadow-lg"
          style={{ backgroundColor: "#F9F2E8", borderBottom: "2px solid #C49A6C" }}
        >
          {allLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-6 py-4 border-b transition-colors"
                style={{
                  borderColor: "#e8d8c4",
                  backgroundColor: isActive ? "#f0e4d0" : "transparent",
                  color: isActive ? "#A63F24" : "#6B4423",
                }}
              >
                <Player icon={link.icon as any} size={24} />
                <span className="text-sm font-medium">{link.label}</span>
                {isActive && (
                  <span className="ml-auto text-xs" style={{ color: "#A63F24" }}>●</span>
                )}
              </Link>
            );
          })}
        </div>
      )}

    </header>
  );
}