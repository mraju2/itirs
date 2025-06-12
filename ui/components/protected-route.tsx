"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";
import { LoadingSpinner } from "../components/loading-spinner";
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "company" | "admin";
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    } else if (
      user &&
      requiredRole &&
      user.user_metadata.role !== requiredRole
    ) {
      router.replace("/unauthorized");
    }
  }, [user, isLoading, router, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
