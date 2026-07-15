// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Player } from "@lordicon/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  MapIcon,
  ShoppingBagIcon,
  BookOpen,
  Home,
  GraduationCap,
  UtensilsCrossed,
  PartyPopper,
  Briefcase,
  ContactRound,
  CalendarDays,
} from "lucide-react";

import guideIcon     from "../public/icons/guide.json";
import homeIcon      from "../public/icons/home.json";
import pencilIcon    from "../public/icons/pencil.json";
import foodIcon      from "../public/icons/food.json";
import funIcon       from "../public/icons/fun.json";
import jobIcon       from "../public/icons/job.json";
import recommendIcon from "../public/icons/recommend.json";
import calendarIcon  from "../public/icons/calendar.json";

const navLinksBefore = [
  { href: "/life",        label: "新生活指南", lucide: BookOpen,      lordicon: guideIcon },
  { href: "/guides/rent", label: "居住與租屋", lucide: Home,          lordicon: homeIcon },
  { href: "/education",   label: "學校與教育", lucide: GraduationCap, lordicon: pencilIcon },
];

const navLinksAfter = [
  { href: "/explore",   label: "社群與玩樂", lucide: PartyPopper,  lordicon: funIcon },
  { href: "/jobs",      label: "工作與求職", lucide: Briefcase,    lordicon: jobIcon },
  { href: "/directory", label: "名片與推薦", lucide: ContactRound, lordicon: recommendIcon },
  { href: "/events",    label: "活動日曆",   lucide: CalendarDays, lordicon: calendarIcon },
];

const foodShoppingLinks = [
  { href: "/restaurants", icon: <MapIcon className="w-4 h-4" />,         title: "美食地圖", description: "台灣餐廳、早午餐、小吃推薦" },
  { href: "/shopping",    icon: <ShoppingBagIcon className="w-4 h-4" />, title: "購物地圖", description: "亞洲超市、台灣商品採買指南" },
];

// 桌面版 — Lordicon 動畫
function DesktopTab({ href, label, lordicon, isActive }: {
  href: string; label: string; lordicon: object; isActive: boolean;
}) {
  const playerRef = useRef<Player>(null);
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-150 whitespace-nowrap text-sm font-medium"
      style={{
        borderBottomColor: isActive ? "#A63F24" : "transparent",
        color: isActive ? "#A63F24" : "#6B4423",
      }}
      onMouseEnter={() => playerRef.current?.playFromBeginning()}
    >
      <Player ref={playerRef} icon={lordicon as any} size={24} />
      <span>{label}</span>
    </Link>
  );
}

// 手機版 — lucide 靜態 icon
function MobileTab({ href, label, Icon, isActive }: {
  href: string; label: string; Icon: React.ElementType; isActive: boolean;
}) {
  return (
    <Link
      href={href}
      data-active={isActive ? "true" : "false"}
      ref={(el) => {
        if (el && isActive) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          }, 100);
        }
      }}
      className="flex items-center gap-1.5 px-4 py-3 border-b-2 transition-all duration-150 whitespace-nowrap"
      style={{
        borderBottomColor: isActive ? "#A63F24" : "transparent",
        color: isActive ? "#A63F24" : "#6B4423",
        fontSize: "14px",
        fontWeight: 500,
      }}
    >
      <Icon size={17} strokeWidth={1.8} />
      <span>{label}</span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [foodOpen, setFoodOpen] = useState(false);
  const foodPlayerRef = useRef<Player>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    const el = mobileNavRef.current;
    if (!el) return;
    // 短暫延遲確保 DOM 更新後再 scroll
    setTimeout(() => {
      const active = el.querySelector('[data-active="true"]') as HTMLElement;
      if (active) {
        active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }, 50);
  }, [pathname]);
  const isFoodActive = pathname.startsWith("/restaurants") || pathname.startsWith("/shopping");

  return (
    <header className="sticky top-0 z-50">

      {/* Header */}
      <div style={{ backgroundColor: "#6B4423" }}>
        <div className="w-full px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between gap-3">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex flex-col items-start leading-none">
            <span className="font-black tracking-widest uppercase"
              style={{ color: "#E8A818", fontSize: "clamp(20px, 5vw, 24px)", lineHeight: "1.1" }}>
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
              style={{ color: "#C49A6C", fontSize: "13px", letterSpacing: "0.15em" }}>
              TAIWAN GUIDE
            </span>
          </Link>

          {/* 搜尋列 */}
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 sm:py-2 w-full max-w-xs sm:max-w-sm"
            style={{ backgroundColor: "#4e2e10", border: "1px solid #8B5A2B" }}
          >
            <svg className="w-4 h-4 shrink-0" style={{ color: "#C49A6C" }}
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="搜尋餐廳、學校、資訊⋯"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-sm outline-none w-full"
              style={{ color: "white" }}
            />
          </div>

        </div>
      </div>

      {/* 桌面版 Tab */}
      <div className="hidden sm:block" style={{ backgroundColor: "#F9F2E8", borderBottom: "2px solid #C49A6C" }}>
        <div className="w-full px-6 flex items-center overflow-x-auto scrollbar-none">
          {navLinksBefore.map((link) => (
            <DesktopTab key={link.href} href={link.href} label={link.label}
              lordicon={link.lordicon} isActive={pathname.startsWith(link.href)} />
          ))}

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="flex items-center gap-2 px-4 py-3 border-b-2 bg-transparent rounded-none h-auto text-sm font-medium"
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
                        <NavigationMenuLink render={
                          <Link href={item.href} className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50">
                            <span className="mt-0.5 shrink-0" style={{ color: "#A63F24" }}>{item.icon}</span>
                            <div>
                              <div className="text-sm font-semibold mb-0.5" style={{ color: "#6B4423" }}>{item.title}</div>
                              <div className="text-xs" style={{ color: "#C49A6C" }}>{item.description}</div>
                            </div>
                          </Link>
                        } />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {navLinksAfter.map((link) => (
            <DesktopTab key={link.href} href={link.href} label={link.label}
              lordicon={link.lordicon} isActive={pathname.startsWith(link.href)} />
          ))}
        </div>
      </div>

      {/* 手機版 Tab — emoji + 文字，左右滑動 */}
      <div className="sm:hidden" style={{ backgroundColor: "#F9F2E8", borderBottom: "2px solid #C49A6C" }}>
        <div className="flex overflow-x-auto scrollbar-none">
          {navLinksBefore.map((link) => (
            <MobileTab key={link.href} href={link.href} label={link.label}
              Icon={link.lucide} isActive={pathname.startsWith(link.href)} />
          ))}

          {/* 美食與購物手機版 */}
          <button
            onClick={() => setFoodOpen((v) => !v)}
            ref={(el) => {
              if (el && isFoodActive) {
                setTimeout(() => {
                  el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }, 100);
              }
            }}
            className="flex items-center gap-1.5 px-4 py-3 border-b-2 transition-all duration-150 whitespace-nowrap"
            style={{
              borderBottomColor: isFoodActive ? "#A63F24" : foodOpen ? "#C49A6C" : "transparent",
              color: isFoodActive ? "#A63F24" : "#6B4423",
              fontSize: "14px",
              fontWeight: 500,
              background: "none",
            }}
          >
            <UtensilsCrossed size={17} strokeWidth={1.8} />
            <span>美食與購物</span>
            <span style={{ fontSize: "10px", marginLeft: "2px" }}>{foodOpen ? "▲" : "▼"}</span>
          </button>

          {navLinksAfter.map((link) => (
            <MobileTab key={link.href} href={link.href} label={link.label}
              Icon={link.lucide} isActive={pathname.startsWith(link.href)} />
          ))}
        </div>
      </div>

      {/* 手機版美食子選單 — fixed 避免被 overflow 裁切 */}
      {foodOpen && (
        <div
          className="sm:hidden fixed left-0 right-0 z-50 shadow-lg"
          style={{
            top: "calc(var(--navbar-height, 120px))",
            backgroundColor: "white",
            border: "1px solid #e8d8c4",
            borderTop: "none",
          }}
        >
          <Link
            href="/restaurants"
            onClick={() => setFoodOpen(false)}
            className="flex items-center gap-3 px-6 py-4 transition-colors"
            style={{ color: "#6B4423", borderBottom: "1px solid #f0e4d0" }}
          >
            <MapIcon size={16} style={{ color: "#A63F24" }} />
            <span className="text-sm font-medium">美食地圖</span>
            <span className="text-xs ml-1" style={{ color: "#C49A6C" }}>台灣餐廳、早午餐、小吃</span>
          </Link>
          <Link
            href="/shopping"
            onClick={() => setFoodOpen(false)}
            className="flex items-center gap-3 px-6 py-4 transition-colors"
            style={{ color: "#6B4423" }}
          >
            <ShoppingBagIcon size={16} style={{ color: "#A63F24" }} />
            <span className="text-sm font-medium">購物地圖</span>
            <span className="text-xs ml-1" style={{ color: "#C49A6C" }}>亞洲超市、採買指南</span>
          </Link>
        </div>
      )}

    </header>
  );
}