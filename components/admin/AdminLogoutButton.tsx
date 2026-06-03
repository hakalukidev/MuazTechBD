"use client";

import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } finally {
      router.replace("/admin/login");
      router.refresh();
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
      onClick={handleLogout}
      disabled={isSubmitting}
    >
      {isSubmitting ? <Loader2 className="animate-spin" /> : <LogOut />}
      Logout
    </Button>
  );
}
