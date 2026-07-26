// components/EmailLink.tsx
import Image from "next/image";

export default function EmailLink({ email, className }: { email: string; className?: string }) {
  return (
    <a href={`mailto:${email}`} className={`inline-flex items-center gap-1 hover:opacity-70 ${className ?? ""}`}>
      <Image src="/email.png" alt="email" width={12} height={12} />
      <span>{email}</span>
    </a>
  );
}
