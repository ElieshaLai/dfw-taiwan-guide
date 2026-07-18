// components/LocationPin.tsx
import Image from "next/image";

export default function LocationPin({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ""}`}>
      <Image src="/location-pin.png" alt="location" width={12} height={12} />
      <span>{text}</span>
    </span>
  );
}
