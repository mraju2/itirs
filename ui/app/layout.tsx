// app/layout.tsx
import "./globals.css";
import { ToastProvider } from "@/components/toast-provider";
import { AuthProvider } from "@/lib/auth-context";
import { ErrorBoundary } from "@/components/error-boundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <ToastContainer />
            <ToastProvider />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
