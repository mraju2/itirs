"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/superbase-clinet";
import { userService } from "@/services/user-service";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    console.log("=== CALLBACK PAGE MOUNTED ===");
    console.log("Current URL:", window.location.href);

    const handleCallback = async () => {
      try {
        // Get the hash fragment
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        console.log("=== OAUTH CALLBACK PARAMS ===");
        console.log("Hash params:", Object.fromEntries(params.entries()));

        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        const error = params.get("error");
        const errorDescription = params.get("error_description");

        if (error) {
          console.error("❌ OAuth error:", error, errorDescription);
          router.replace("/login?error=1");
          return;
        }

        if (!accessToken) {
          console.error("❌ No access token found in URL");
          router.replace("/login?error=1");
          return;
        }

        // Set the session using the tokens
        console.log("=== SETTING SESSION ===");
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || "",
        });

        console.log("Session set result:", { session, error: sessionError });

        if (sessionError) {
          console.error("❌ Failed to set session:", sessionError);
          router.replace("/login?error=1");
          return;
        }

        if (!session) {
          console.error("❌ No session after setting tokens");
          router.replace("/login?error=1");
          return;
        }

        // Set the auth token as a cookie
        document.cookie = `sb-access-token=${accessToken}; path=/; max-age=3600; SameSite=Lax`;

        // Check storage
        console.log("=== STORAGE CHECK ===");
        console.log("LocalStorage items:", Object.keys(localStorage));
        console.log("SessionStorage items:", Object.keys(sessionStorage));
        console.log("Cookies:", document.cookie);

        // Wait for the session to be properly set
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check storage again after delay
        console.log("=== STORAGE CHECK AFTER DELAY ===");
        console.log("LocalStorage items:", Object.keys(localStorage));
        console.log("SessionStorage items:", Object.keys(sessionStorage));
        console.log("Cookies:", document.cookie);

        console.log("✅ Successfully authenticated");
        console.log("User:", session.user);

        // Check user profile using userService
        try {
          console.log("=== CHECKING USER PROFILE ===");
          const userId = session.user.id;
          console.log("Checking profile for user ID:", userId);

          try {
            const profile = await userService.getRegistrationById(userId);
            console.log("✅ User service profile fetched:", profile);

            // Check if profile is complete by verifying required fields
            const isProfileComplete = Boolean(
              profile.firstName &&
                profile.lastName &&
                profile.fatherName &&
                profile.dateOfBirth &&
                profile.trade &&
                profile.address &&
                profile.mandal &&
                profile.district &&
                profile.passYear &&
                profile.percentage &&
                profile.phoneNumber &&
                profile.email &&
                profile.itiName
            );

            if (isProfileComplete) {
              console.log("✅ Profile is complete. Redirecting to homepage...");
              router.replace("/");
            } else {
              console.log(
                "🚧 Profile is incomplete. Redirecting to profile page..."
              );
              router.replace("/profile");
            }
          } catch (profileError: Error | unknown) {
            // Check if this is a "not found" error
            if (
              profileError instanceof Error &&
              profileError.message?.includes("User not found")
            ) {
              console.log(
                "👋 New user detected. Redirecting to complete profile..."
              );
              // For new users, redirect to complete profile with their Google info
              const userData = {
                email: session.user.email,
                firstName:
                  session.user.user_metadata?.full_name?.split(" ")[0] || "",
                lastName:
                  session.user.user_metadata?.full_name
                    ?.split(" ")
                    .slice(1)
                    .join(" ") || "",
                phoneNumber: session.user.phone || "",
                // Add any other fields you want to pre-fill from Google data
              };

              // Store the user data in session storage for the complete profile page
              sessionStorage.setItem("newUserData", JSON.stringify(userData));
              router.replace("/user-registration");
            } else {
              // For other errors, log and redirect to login
              console.error("❌ Error checking profile:", profileError);
              router.replace("/login?error=1");
            }
          }
        } catch (err) {
          console.error("❌ Unexpected error in profile check:", err);
          router.replace("/login?error=1");
        }
      } catch (err) {
        console.error("❌ Unexpected error in callback:", err);
        router.replace("/login?error=1");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Checking your profile...</h2>
        <p className="text-gray-600">
          Please wait while we set up your account.
        </p>
      </div>
    </div>
  );
}
