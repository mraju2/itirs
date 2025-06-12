// app/layout.tsx
import "./globals.css";
import { ToastProvider } from "@/components/toast-provider";

export const metadata = {
  title: "SkillsConnect",
  description: "ITI Students Job Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
