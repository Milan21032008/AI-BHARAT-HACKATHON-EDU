
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

/**
 * A robust back button that handles navigation safety.
 */
export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Paths where a back button might not make sense or should behave differently
  const isHome = pathname === "/record";
  const isOnboardingStart = pathname === "/";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router, pathname]);

  const handleBack = () => {
    // If we are on the select-teacher page and came from record, just go back.
    // If we land here from onboarding, back might go to onboarding (which is closed).
    // router.back() is generally safe as Next.js handles the history stack.
    router.back();
  };

  if (isOnboardingStart) return <div className="size-10" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBack}
      aria-label="Go back"
      className="rounded-full transition-all hover:bg-primary/5 active:scale-90"
    >
      <ArrowLeft className="size-6 text-foreground" />
    </Button>
  );
}
