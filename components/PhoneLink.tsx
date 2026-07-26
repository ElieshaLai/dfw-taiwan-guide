// components/PhoneLink.tsx
import Image from "next/image";

export default function PhoneLink({ phone, className }: { phone: string; className?: string }) {
  return (
    <a href={`tel:${phone}`} className={`inline-flex items-center gap-1 hover:opacity-70 ${className ?? ""}`}>
      <Image src="/phone.png" alt="phone" width={12} height={12} />
      <span>{phone}</span>
    </a>
  );
}
